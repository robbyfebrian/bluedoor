<?php

namespace App\Filament\Resources\MenuItems\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class MenuItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-clipboard-document-list')
            ->emptyStateHeading('Belum Ada Item Menu')
            ->emptyStateDescription('Belum ada item menu yang ditambahkan, anda dapat menambahkan secara manual lewat button "Tambah Item Menu" di atas')
            ->columns([
                ImageColumn::make('image')
                    ->label('Gambar')
                    ->square()
                    ->imageSize(56)
                    ->circular(),

                TextColumn::make('name')
                    ->label('Nama Menu')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('menuCategory.name')
                    ->label('Kategori')
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('price')
                    ->label('Harga')
                    ->formatStateUsing(fn ($state) => 'Rp ' . number_format((float) $state, 0, ',', '.'))
                    ->sortable(),

                ToggleColumn::make('is_available')
                    ->label('Tersedia')
                    ->alignCenter(),

                ToggleColumn::make('is_featured')
                    ->label('Unggulan')
                    ->alignCenter(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('menu_category_id')
                    ->label('Kategori')
                    ->relationship('menuCategory', 'name')
                    ->searchable()
                    ->preload(),

                TernaryFilter::make('is_available')
                    ->label('Ketersediaan')
                    ->placeholder('Semua')
                    ->trueLabel('Tersedia')
                    ->falseLabel('Tidak Tersedia'),

                TernaryFilter::make('is_featured')
                    ->label('Unggulan')
                    ->placeholder('Semua')
                    ->trueLabel('Menu Unggulan')
                    ->falseLabel('Non Unggulan'),
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
            ->defaultSort('name', 'asc')
            ->striped();
    }
}
