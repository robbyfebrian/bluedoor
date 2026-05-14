<?php

namespace App\Filament\Resources\JobApplications\Tables;

use App\Enums\JobApplicationStatus;
use App\Services\Recruitment\HireCandidateService;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
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
            ->emptyStateIcon('heroicon-o-document')
            ->emptyStateHeading('Belum Ada Lamaran')
            ->emptyStateDescription('Belum ada lamaran pekerjaan yang masuk, pelamar dapat mengirim lamaran melalui halaman karir di website')
            ->columns([
                TextColumn::make('jobOpening.title')
                    ->label('Posisi Dilamar')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('jobOpening.branch.name')
                    ->label('Cabang')
                    ->badge()
                    ->color('info')
                    ->default('Semua Cabang')
                    ->sortable(),

                TextColumn::make('name')
                    ->label('Nama Pelamar')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable(),

                TextColumn::make('phone')
                    ->label('No. HP')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (JobApplicationStatus|string $state): string => match ($state instanceof JobApplicationStatus ? $state->value : $state) {
                        JobApplicationStatus::Pending->value    => 'warning',
                        JobApplicationStatus::Reviewing->value  => 'info',
                        JobApplicationStatus::Shortlisted->value => 'success',
                        JobApplicationStatus::Rejected->value   => 'danger',
                        JobApplicationStatus::Hired->value      => 'success',
                        default                                  => 'gray',
                    })
                    ->formatStateUsing(fn (JobApplicationStatus|string $state): string => match ($state instanceof JobApplicationStatus ? $state->value : $state) {
                        JobApplicationStatus::Pending->value    => 'Menunggu',
                        JobApplicationStatus::Reviewing->value  => 'Ditinjau',
                        JobApplicationStatus::Shortlisted->value => 'Terpilih',
                        JobApplicationStatus::Rejected->value   => 'Ditolak',
                        JobApplicationStatus::Hired->value      => 'Diterima',
                        default                                  => ucfirst($state instanceof JobApplicationStatus ? $state->value : $state),
                    })
                    ->sortable(),

                TextColumn::make('reviewer.name')
                    ->label('Ditinjau Oleh')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Tanggal Melamar')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options(JobApplicationStatus::options())
                    ->multiple(),

                SelectFilter::make('job_opening_id')
                    ->label('Posisi')
                    ->relationship('jobOpening', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ViewAction::make(),

                Action::make('review')
                    ->label('Tinjau')
                    ->icon('heroicon-o-magnifying-glass')
                    ->color('info')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('review', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Reviewing, auth()->guard()->id()))
                    ->requiresConfirmation(),

                Action::make('shortlist')
                    ->label('Seleksi')
                    ->icon('heroicon-o-check-badge')
                    ->color('success')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('shortlist', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Shortlisted, auth()->guard()->id()))
                    ->requiresConfirmation(),

                Action::make('hire')
                    ->label('Terima')
                    ->icon('heroicon-o-hand-thumb-up')
                    ->color('success')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('hire', $record))
                    ->action(fn ($record) => app(HireCandidateService::class)->hire($record, (int) auth()->guard()->id()))
                    ->requiresConfirmation(),

                Action::make('reject')
                    ->label('Tolak')
                    ->icon('heroicon-o-hand-thumb-down')
                    ->color('danger')
                    ->visible(fn ($record): bool => auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('reject', $record))
                    ->action(fn ($record) => $record->transitionTo(JobApplicationStatus::Rejected, auth()->guard()->id()))
                    ->requiresConfirmation(),

                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->striped();
    }
}
