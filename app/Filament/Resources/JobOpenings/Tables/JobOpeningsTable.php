<?php

namespace App\Filament\Resources\JobOpenings\Tables;

use App\Models\Branch;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class JobOpeningsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-briefcase')
            ->emptyStateHeading('Belum Ada Lowongan')
            ->emptyStateDescription('Belum ada lowongan pekerjaan, anda dapat menambahkan secara manual lewat button "Tambah Lowongan" di atas')
            ->columns([
                TextColumn::make('title')
                    ->label('Posisi')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('branch.name')
                    ->label('Cabang')
                    ->badge()
                    ->color('info')
                    ->default('Semua Cabang')
                    ->sortable(),

                TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'full-time'  => 'success',
                        'part-time'  => 'info',
                        'contract'   => 'warning',
                        'internship' => 'gray',
                        default      => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'full-time'  => 'Full Time',
                        'part-time'  => 'Part Time',
                        'contract'   => 'Kontrak',
                        'internship' => 'Magang',
                        default      => ucfirst($state),
                    })
                    ->sortable(),

                TextColumn::make('location')
                    ->label('Lokasi')
                    ->searchable(),

                TextColumn::make('salary_range')
                    ->label('Rentang Gaji')
                    ->placeholder('Tidak ditentukan'),

                TextColumn::make('job_applications_count')
                    ->label('Pelamar')
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state === 0 => 'gray',
                        $state < 5   => 'warning',
                        default      => 'success',
                    })
                    ->sortable()
                    ->alignCenter(),

                TextColumn::make('closes_at')
                    ->label('Tutup Lamaran')
                    ->date('d M Y')
                    ->sortable()
                    ->placeholder('Tidak ada batas'),

                ToggleColumn::make('is_active')
                    ->label('Aktif')
                    ->alignCenter(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('branch_id')
                    ->label('Cabang')
                    ->options(Branch::active()->pluck('name', 'id'))
                    ->placeholder('Semua Cabang'),

                SelectFilter::make('type')
                    ->label('Tipe Pekerjaan')
                    ->options([
                        'full-time'  => 'Full Time',
                        'part-time'  => 'Part Time',
                        'contract'   => 'Kontrak',
                        'internship' => 'Magang',
                    ]),

                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->placeholder('Semua')
                    ->trueLabel('Aktif')
                    ->falseLabel('Nonaktif'),
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
