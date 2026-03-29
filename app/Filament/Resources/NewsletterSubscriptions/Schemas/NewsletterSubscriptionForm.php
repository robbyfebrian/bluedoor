<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Schemas;

use App\Enums\NewsletterSubscriptionStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NewsletterSubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('name'),
                Select::make('status')
                    ->options(NewsletterSubscriptionStatus::options())
                    ->required()
                    ->default(NewsletterSubscriptionStatus::PendingVerification->value)
                    ->disabledOn('edit')
                    ->helperText('Status berubah melalui endpoint/public flow dan workflow action.'),
                DateTimePicker::make('verified_at'),
                DateTimePicker::make('unsubscribed_at'),
            ]);
    }
}
