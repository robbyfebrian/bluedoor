<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Schemas;

use App\Enums\NewsletterSubscriptionStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class NewsletterSubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Pelanggan')
                    ->description('Informasi identitas pelanggan newsletter.')
                    ->icon('heroicon-o-envelope')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('email')
                                ->label('Alamat Email')
                                ->placeholder('pelanggan@email.com')
                                ->email()
                                ->required(),

                            TextInput::make('name')
                                ->label('Nama')
                                ->placeholder('Nama pelanggan (opsional)'),
                        ]),
                    ]),

                Section::make('Status Langganan')
                    ->description('Status dan waktu perubahan langganan.')
                    ->icon('heroicon-o-bell')
                    ->columnSpanFull()
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->options(NewsletterSubscriptionStatus::options())
                            ->required()
                            ->default(NewsletterSubscriptionStatus::PendingVerification->value)
                            ->disabledOn('edit')
                            ->helperText('Status berubah melalui alur verifikasi email dan unsubscribe link.'),

                        Grid::make(2)->schema([
                            DateTimePicker::make('verified_at')
                                ->label('Waktu Verifikasi')
                                ->native(false),

                            DateTimePicker::make('unsubscribed_at')
                                ->label('Waktu Berhenti')
                                ->native(false),
                        ]),
                    ]),
            ]);
    }
}
