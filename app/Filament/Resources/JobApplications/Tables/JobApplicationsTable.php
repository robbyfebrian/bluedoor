<?php

namespace App\Filament\Resources\JobApplications\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class JobApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('jobOpening.title')
                    ->label('Job Position')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'reviewing' => 'info',
                        'shortlisted' => 'success',
                        'rejected' => 'danger',
                        'hired' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('reviewer.name')
                    ->label('Reviewed By')
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->label('Applied At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'reviewing' => 'Reviewing',
                        'shortlisted' => 'Shortlisted',
                        'rejected' => 'Rejected',
                        'hired' => 'Hired',
                    ])
                    ->multiple(),
                SelectFilter::make('job_opening_id')
                    ->label('Job Position')
                    ->relationship('jobOpening', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
