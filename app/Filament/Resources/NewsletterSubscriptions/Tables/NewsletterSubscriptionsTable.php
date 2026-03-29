<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Tables;

use App\Enums\NewsletterSubscriptionStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NewsletterSubscriptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (NewsletterSubscriptionStatus|string $state): string => match ($state instanceof NewsletterSubscriptionStatus ? $state : NewsletterSubscriptionStatus::from($state)) {
                        NewsletterSubscriptionStatus::PendingVerification => 'warning',
                        NewsletterSubscriptionStatus::Subscribed => 'success',
                        NewsletterSubscriptionStatus::Unsubscribed => 'gray',
                    })
                    ->formatStateUsing(fn (NewsletterSubscriptionStatus|string $state): string => ucwords(str_replace('_', ' ', $state instanceof NewsletterSubscriptionStatus ? $state->value : $state))),
                TextColumn::make('verified_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('unsubscribed_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
