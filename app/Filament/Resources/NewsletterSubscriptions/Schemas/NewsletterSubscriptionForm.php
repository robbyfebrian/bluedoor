<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
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
                Toggle::make('is_subscribed')
                    ->required(),
                DateTimePicker::make('verified_at'),
                DateTimePicker::make('unsubscribed_at'),
            ]);
    }
}
