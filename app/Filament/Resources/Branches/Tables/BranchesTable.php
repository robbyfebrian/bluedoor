<?php

namespace App\Filament\Resources\Branches\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class BranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable()
                    ->label('Code'),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label('Branch Name'),
                TextColumn::make('city')
                    ->searchable()
                    ->sortable()
                    ->label('City'),
                TextColumn::make('phone')
                    ->searchable()
                    ->label('Phone'),
                TextColumn::make('manager.name')
                    ->searchable()
                    ->sortable()
                    ->label('Manager')
                    ->placeholder('No manager assigned'),
                TextColumn::make('opening_time')
                    ->time('H:i')
                    ->label('Opens'),
                TextColumn::make('closing_time')
                    ->time('H:i')
                    ->label('Closes'),
                IconColumn::make('is_active')
                    ->boolean()
                    ->sortable()
                    ->label('Active'),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->placeholder('All branches')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
            ])
            ->recordActions([
                Action::make('toggle_active')
                    ->icon(fn ($record) => $record->is_active ? 'heroicon-o-x-circle' : 'heroicon-o-check-circle')
                    ->color(fn ($record) => $record->is_active ? 'danger' : 'success')
                    ->action(fn ($record) => $record->update(['is_active' => !$record->is_active]))
                    ->label(fn ($record) => $record->is_active ? 'Deactivate' : 'Activate')
                    ->requiresConfirmation(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('code', 'asc');
    }
}
