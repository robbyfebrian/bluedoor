<?php

namespace App\Filament\Resources\MenuCategories\Schemas;

use App\Models\Branch;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class MenuCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Kategori')
                    ->description('Isi nama dan deskripsi kategori menu ini.')
                    ->icon('heroicon-o-tag')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('name')
                                ->label('Nama Kategori')
                                ->placeholder('Contoh: Kopi Espresso, Non-Kopi, Camilan')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->label('Slug URL')
                                ->placeholder('otomatis-dari-nama')
                                ->required()
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->helperText('Otomatis dibuat dari nama kategori.')
                                ->dehydrated()
                                ->disabled(),

                            Select::make('branch_id')
                                ->label('Cabang')
                                ->relationship('branch', 'name')
                                ->options(Branch::active()->pluck('name', 'id'))
                                ->searchable()
                                ->preload()
                                ->noOptionsMessage('Buat cabang terlebih dahulu')
                                ->placeholder('Berlaku untuk semua cabang')
                                ->helperText('Kosongkan jika berlaku untuk semua cabang.')
                                ->nullable(),
                        ]),

                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->placeholder('Jelaskan jenis menu dalam kategori ini, contoh: Kopi berbasis espresso dengan berbagai variasi susu.')
                            ->rows(4)
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Kategori Aktif')
                            ->helperText('Nonaktifkan untuk menyembunyikan kategori ini dari tampilan publik.')
                            ->default(true)
                            ->inline(false),
                    ]),
            ]);
    }
}
