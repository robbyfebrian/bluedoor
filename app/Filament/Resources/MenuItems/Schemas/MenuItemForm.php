<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use App\Support\CurrencyInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TagsInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class MenuItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Section::make('Informasi Menu')
                    ->description('Nama, kategori, dan deskripsi item menu.')
                    ->icon('heroicon-o-cake')
                    ->columnSpanFull()
                    ->columns(4)
                    ->schema([
                        Select::make('menu_category_id')
                            ->label('Kategori Menu')
                            ->relationship('menuCategory', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),

                        TextInput::make('name')
                            ->label('Nama Menu')
                            ->placeholder('Contoh: Espresso, Caramel Latte')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->label('Slug URL')
                            ->placeholder('otomatis-dari-nama')
                            ->dehydrated()
                            ->disabled()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        TextInput::make('price')
                            ->label('Harga')
                            ->required()
                            ->prefix('Rp')
                            ->inputMode('numeric')
                            ->extraInputAttributes([
                                'oninput' => 'let v=this.value.replace(/\D/g,"");v=v.replace(/^0+(?=\d)/,"");this.value=v.replace(/\B(?=(\d{3})+(?!\d))/g,".");',
                            ])
                            ->dehydrateStateUsing(fn ($state) => CurrencyInput::toInteger($state))
                            ->formatStateUsing(fn ($state) => CurrencyInput::formatThousands($state))
                            ->placeholder('0'),

                        FileUpload::make('image')
                            ->label('Foto Menu')
                            ->image()
                            ->directory('menu-items')
                            ->imageEditor()
                            ->helperText('Gunakan foto landscape dengan pencahayaan yang baik.')
                            ->columnSpanFull(),

                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->placeholder('Deskripsikan cita rasa, bahan utama, atau keunikan menu ini...')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Pengaturan')
                    ->description('Status ketersediaan, fitur unggulan, alergen, dan urutan.')
                    ->icon('heroicon-o-adjustments-horizontal')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(2)->schema([
                            Toggle::make('is_available')
                                ->label('Tersedia')
                                ->default(true)
                                ->inline(false)
                                ->helperText('Nonaktifkan jika menu ini sedang tidak tersedia.'),

                            Toggle::make('is_featured')
                                ->label('Menu Unggulan')
                                ->default(false)
                                ->inline(false)
                                ->helperText('Menu unggulan ditampilkan secara khusus di halaman utama.'),
                        ]),

                        TagsInput::make('allergens')
                            ->label('Alergen')
                            ->placeholder('Tambah alergen (misal: gluten, susu, kacang)...')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
