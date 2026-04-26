<?php

namespace App\Filament\Resources\GalleryImages\Tables;

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

class GalleryImagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-photo')
            ->emptyStateHeading('Belum Ada Gambar Galeri')
            ->emptyStateDescription('Belum ada gambar galeri yang ditambahkan, anda dapat menambahkan secara manual lewat button "Tambah Gambar" di atas')
            ->columns([
                TextColumn::make('order')
                    ->label('#')
                    ->sortable()
                    ->alignCenter()
                    ->width('48px'),

                ImageColumn::make('image_path')
                    ->label('Foto')
                    ->disk('public')
                    ->size(72)
                    ->square(),

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->default('(Tanpa judul)'),

                TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'coffee'   => 'amber',
                        'food'     => 'success',
                        'ambiance' => 'info',
                        'events'   => 'warning',
                        default    => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'coffee'   => 'Kopi',
                        'food'     => 'Makanan',
                        'ambiance' => 'Suasana',
                        'events'   => 'Acara',
                        default    => ucfirst($state),
                    })
                    ->sortable(),

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
                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'coffee'   => 'Kopi',
                        'food'     => 'Makanan',
                        'ambiance' => 'Suasana',
                        'events'   => 'Acara',
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
            ->reorderable('order')
            ->defaultSort('order', 'asc')
            ->striped();
    }
}
