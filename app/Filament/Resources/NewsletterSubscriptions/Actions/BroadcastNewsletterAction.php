<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Actions;

use App\Models\NewsletterSubscription;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Mail;

class BroadcastNewsletterAction
{
    public static function make(): Action
    {
        return Action::make('broadcast')
            ->label('Broadcast Newsletter')
            ->icon('heroicon-o-paper-airplane')
            ->color('success')
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

                $pdfPath = storage_path('app/newsletters/' . time() . '.pdf');
                $pdf->save($pdfPath);

                // Send emails (in production, this should be queued)
                $count = 0;
                foreach ($subscribers as $subscriber) {
                    try {
                        Mail::send('emails.newsletter', [
                            'subscriber' => $subscriber,
                            'subject' => $data['subject'],
                            'content' => $data['content'],
                        ], function ($message) use ($subscriber, $data, $pdfPath) {
                            $message->to($subscriber->email, $subscriber->name)
                                ->subject($data['subject'])
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
            });
    }
}
