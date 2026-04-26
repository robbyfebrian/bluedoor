<?php

namespace App\Filament\Resources\GalleryImages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GalleryImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detail Gambar')
                    ->description('Upload foto dan informasi singkat tentang gambar ini.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Foto')
                            ->image()
                            ->required()
                            ->disk('public')
                            ->directory('gallery')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->helperText('Format JPG/PNG/WebP, maks 5MB.')
                            ->columnSpanFull(),

                        TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Contoh: Suasana Sore di Kemang')
                            ->maxLength(255),

                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->placeholder('Ceritakan momen yang tertangkap dalam foto ini...')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Pengaturan')
                    ->description('Kategori, urutan tampil, dan status aktif foto.')
                    ->icon('heroicon-o-adjustments-horizontal')
                    ->schema([
                        Grid::make(3)->schema([
                            Select::make('category')
                                ->label('Kategori')
                                ->required()
                                ->options([
                                    'coffee'   => 'Kopi',
                                    'food'     => 'Makanan',
                                    'ambiance' => 'Suasana',
                                    'events'   => 'Acara',
                                ])
                                ->default('coffee')
                                ->native(false),

                            TextInput::make('order')
                                ->label('Urutan Tampil')
                                ->required()
                                ->numeric()
                                ->minValue(0)
                                ->default(0)
                                ->suffix('urutan')
                                ->helperText('Angka lebih kecil tampil lebih awal.'),

                            Toggle::make('is_active')
                                ->label('Aktif')
                                ->default(true)
                                ->inline(false)
                                ->helperText('Nonaktif = tersembunyi dari galeri publik.'),
                        ]),
                    ]),
            ]);
    }
}
