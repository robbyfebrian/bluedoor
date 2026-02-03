<?php

namespace App\Filament\Resources\GalleryImages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class GalleryImagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')
                    ->disk('public')
                    ->size(80)
                    ->label('Image'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->label('Title')
                    ->default('(No title)'),
                TextColumn::make('category')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'coffee' => 'amber',
                        'food' => 'success',
                        'ambiance' => 'info',
                        'events' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state))
                    ->sortable()
                    ->label('Category'),
                TextColumn::make('order')
                    ->numeric()
                    ->sortable()
                    ->label('Order'),
                IconColumn::make('is_active')
                    ->boolean()
                    ->sortable()
                    ->label('Active'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable()
                    ->label('Created'),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'coffee' => 'Coffee',
                        'food' => 'Food',
                        'ambiance' => 'Ambiance',
                        'events' => 'Events',
                    ]),
                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->placeholder('All images')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
            ])
            ->recordActions([
                Action::make('toggle_active')
                    ->icon(fn ($record) => $record->is_active ? 'heroicon-o-eye-slash' : 'heroicon-o-eye')
                    ->color(fn ($record) => $record->is_active ? 'danger' : 'success')
                    ->action(fn ($record) => $record->update(['is_active' => !$record->is_active]))
                    ->label(fn ($record) => $record->is_active ? 'Deactivate' : 'Activate'),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order', 'asc')
            ->reorderable('order');
    }
}
