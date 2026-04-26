<?php

namespace App\Filament\Resources\Branches\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class BranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-building-storefront')
            ->emptyStateHeading('Belum Ada Cabang')
            ->emptyStateDescription('Belum ada cabang yang ditambahkan, anda dapat menambahkan cabang secara manual lewat button "Tambah Cabang" di atas')
            ->columns([
                TextColumn::make('code')
                    ->label('Kode')
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('name')
                    ->label('Nama Cabang')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('city')
                    ->label('Kota')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->label('Telepon')
                    ->searchable()
                    ->copyable(),

                TextColumn::make('manager.name')
                    ->label('Manajer')
                    ->searchable()
                    ->sortable()
                    ->placeholder('Belum ada manajer'),

                TextColumn::make('employees_count')
                    ->label('Karyawan')
                    ->badge()
                    ->color('success')
                    ->sortable()
                    ->alignCenter(),

                TextColumn::make('opening_time')
                    ->label('Buka')
                    ->time('H:i'),

                TextColumn::make('closing_time')
                    ->label('Tutup')
                    ->time('H:i'),

                ToggleColumn::make('is_active')
                    ->label('Aktif')
                    ->alignCenter(),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->placeholder('Semua Cabang')
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
            ->defaultSort('code', 'asc')
            ->striped();
    }
}
