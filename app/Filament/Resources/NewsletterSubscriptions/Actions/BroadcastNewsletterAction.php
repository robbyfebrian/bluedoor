<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Actions;

use App\Models\NewsletterSubscription;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Gate;

class BroadcastNewsletterAction
{
    protected static function canBroadcast(): bool
    {
        if (! auth()->guard()->check()) {
            return false;
        }

        $user = auth()->guard()->user();

        return $user->hasRole('super_admin')
            || Gate::forUser($user)->allows('broadcast', NewsletterSubscription::class);
    }

    public static function make(): Action
    {
        return Action::make('broadcast')
            ->label('Broadcast Newsletter')
            ->icon('heroicon-o-paper-airplane')
            ->color('primary')
            ->form([
                TextInput::make('subject')
                    ->required()
                    ->maxLength(255)
                    ->label('Email Subject'),
                RichEditor::make('content')
                    ->required()
                    ->label('Newsletter Content')
                    ->columnSpanFull(),
            ])
            ->action(function (array $data) {
                abort_unless(static::canBroadcast(), 403);

                $mailer = (string) config('mail.default');
                if (in_array($mailer, ['log', 'array'], true)) {
                    Notification::make()
                        ->warning()
                        ->title('SMTP belum aktif')
                        ->body("Mailer saat ini `{$mailer}`. Email tidak dikirim ke inbox asli sebelum SMTP dikonfigurasi.")
                        ->send();
                }

                $subscribers = NewsletterSubscription::subscribed()->verified()->get();

                if ($subscribers->isEmpty()) {
                    Notification::make()
                        ->warning()
                        ->title('No Subscribers')
                        ->body('There are no active subscribers to send the newsletter to.')
                        ->send();
                    return;
                }

                // Generate PDF
                $pdf = Pdf::loadView('newsletters.template', [
                    'subject' => $data['subject'],
                    'content' => $data['content'],
                ]);

                $newsletterDir = storage_path('app/newsletters');
                File::ensureDirectoryExists($newsletterDir);

                $pdfPath = $newsletterDir . '/' . time() . '.pdf';
                $pdf->save($pdfPath);

                // Send emails (in production, this should be queued)
                $count = 0;
                foreach ($subscribers as $subscriber) {
                    try {
                        $fromAddress = (string) config('mail.from.address');
                        $isResendTestingSender = str_ends_with(strtolower($fromAddress), '@resend.dev');

                        Mail::send('emails.newsletter', [
                            'subscriber' => $subscriber,
                            'subject' => $data['subject'],
                            'content' => $data['content'],
                        ], function ($message) use ($subscriber, $data, $pdfPath, $isResendTestingSender) {
                            if ($isResendTestingSender) {
                                // Resend testing mode expects strict plain recipient email.
                                $message->to($subscriber->email);
                            } else {
                                $message->to($subscriber->email, $subscriber->name);
                            }

                            $message->subject($data['subject'])
                                ->attach($pdfPath);
                        });
                        $count++;
                    } catch (\Exception $e) {
                        // Log error but continue
                        logger()->error('Failed to send newsletter to ' . $subscriber->email, [
                            'error' => $e->getMessage()
                        ]);
                    }
                }

                Notification::make()
                    ->success()
                    ->title('Newsletter Sent!')
                    ->body("Successfully sent newsletter to {$count} subscriber(s).")
                    ->send();
            })
            ->visible(fn (): bool => static::canBroadcast());
    }
}
