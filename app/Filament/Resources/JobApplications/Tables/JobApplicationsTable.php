<?php

namespace App\Filament\Resources\JobApplications\Tables;

use App\Enums\JobApplicationStatus;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;

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
                    ->color(fn (JobApplicationStatus|string $state): string => match ($state instanceof JobApplicationStatus ? $state->value : $state) {
                        JobApplicationStatus::Pending->value => 'warning',
                        JobApplicationStatus::Reviewing->value => 'info',
                        JobApplicationStatus::Shortlisted->value => 'success',
                        JobApplicationStatus::Rejected->value => 'danger',
                        JobApplicationStatus::Hired->value => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (JobApplicationStatus|string $state): string => ucwords(str_replace('_', ' ', $state instanceof JobApplicationStatus ? $state->value : $state)))
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
                    ->options(JobApplicationStatus::options())
                    ->multiple(),
                SelectFilter::make('job_opening_id')
                    ->label('Job Position')
                    ->relationship('jobOpening', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ViewAction::make(),
                Action::make('review')
                    ->icon('heroicon-o-magnifying-glass')
                    ->color('info')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('review', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Reviewing, auth()->guard()->id()))
                    ->requiresConfirmation(),
                Action::make('shortlist')
                    ->icon('heroicon-o-check-badge')
                    ->color('success')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('shortlist', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Shortlisted, auth()->guard()->id()))
                    ->requiresConfirmation(),
                Action::make('hire')
                    ->icon('heroicon-o-hand-thumb-up')
                    ->color('success')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('hire', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Hired, auth()->guard()->id()))
                    ->requiresConfirmation(),
                Action::make('reject')
                    ->icon('heroicon-o-hand-thumb-down')
                    ->color('danger')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('reject', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Rejected, auth()->guard()->id()))
                    ->requiresConfirmation(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
