<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Tables;

use App\Enums\NewsletterSubscriptionStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class NewsletterSubscriptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-envelope')
            ->emptyStateHeading('Belum Ada Langganan')
            ->emptyStateDescription('Belum ada langganan newsletter, anda dapat menambahkan secara manual lewat button "Tambah Langganan" di atas')
            ->columns([
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->weight('semibold'),

                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->default('—'),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (NewsletterSubscriptionStatus|string $state): string => match ($state instanceof NewsletterSubscriptionStatus ? $state : NewsletterSubscriptionStatus::from($state)) {
                        NewsletterSubscriptionStatus::PendingVerification => 'warning',
                        NewsletterSubscriptionStatus::Subscribed           => 'success',
                        NewsletterSubscriptionStatus::Unsubscribed         => 'gray',
                    })
                    ->formatStateUsing(fn (NewsletterSubscriptionStatus|string $state): string => match ($state instanceof NewsletterSubscriptionStatus ? $state : NewsletterSubscriptionStatus::from($state)) {
                        NewsletterSubscriptionStatus::PendingVerification => 'Menunggu Verifikasi',
                        NewsletterSubscriptionStatus::Subscribed           => 'Berlangganan',
                        NewsletterSubscriptionStatus::Unsubscribed         => 'Berhenti Berlangganan',
                    }),

                TextColumn::make('verified_at')
                    ->label('Terverifikasi')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('unsubscribed_at')
                    ->label('Berhenti')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Bergabung')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        NewsletterSubscriptionStatus::PendingVerification->value => 'Menunggu Verifikasi',
                        NewsletterSubscriptionStatus::Subscribed->value           => 'Berlangganan',
                        NewsletterSubscriptionStatus::Unsubscribed->value         => 'Berhenti Berlangganan',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped();
    }
}
