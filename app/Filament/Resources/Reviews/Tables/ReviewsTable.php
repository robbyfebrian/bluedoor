<?php

namespace App\Filament\Resources\Reviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('customer_name')
                    ->searchable()
                    ->sortable()
                    ->label('Customer'),
                TextColumn::make('rating')
                    ->badge()
                    ->color(fn ($state) => match (true) {
                        $state >= 4 => 'success',
                        $state >= 3 => 'warning',
                        default => 'danger',
                    })
                    ->suffix(' ⭐')
                    ->sortable()
                    ->label('Rating'),
                TextColumn::make('comment')
                    ->limit(50)
                    ->searchable()
                    ->label('Review'),
                IconColumn::make('is_approved')
                    ->boolean()
                    ->sortable()
                    ->label('Approved'),
                IconColumn::make('is_featured')
                    ->boolean()
                    ->sortable()
                    ->label('Featured'),
                TextColumn::make('approver.name')
                    ->label('Approved By')
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Submitted'),
            ])
            ->filters([
                TernaryFilter::make('is_approved')
                    ->label('Approval Status')
                    ->placeholder('All reviews')
                    ->trueLabel('Approved only')
                    ->falseLabel('Pending only'),
                TernaryFilter::make('is_featured')
                    ->label('Featured')
                    ->placeholder('All reviews')
                    ->trueLabel('Featured only')
                    ->falseLabel('Not featured'),
                SelectFilter::make('rating')
                    ->options([
                        5 => '5 Stars',
                        4 => '4 Stars',
                        3 => '3 Stars',
                        2 => '2 Stars',
                        1 => '1 Star',
                    ]),
            ])
            ->recordActions([
                Action::make('approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('approve', $record), 403);

                        $record->update([
                            'is_approved' => true,
                            'approved_at' => now(),
                            'approved_by' => auth()->guard()->id(),
                        ]);
                    })
                    ->visible(fn ($record) => !$record->is_approved && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('approve', $record))
                    ->requiresConfirmation(),
                Action::make('feature')
                    ->icon('heroicon-o-star')
                    ->color('warning')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('feature', $record), 403);
                        $record->update(['is_featured' => !$record->is_featured]);
                    })
                    ->visible(fn ($record) => $record->is_approved && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('feature', $record))
                    ->label(fn ($record) => $record->is_featured ? 'Unfeature' : 'Feature'),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
