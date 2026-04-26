<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pelanggan')
                    ->description('Nama dan email pelanggan yang memberikan ulasan.')
                    ->icon('heroicon-o-user')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('customer_name')
                                ->label('Nama Pelanggan')
                                ->placeholder('Nama pelanggan')
                                ->required()
                                ->maxLength(255),

                            TextInput::make('customer_email')
                                ->label('Email Pelanggan')
                                ->placeholder('pelanggan@email.com')
                                ->email()
                                ->maxLength(255),
                        ]),
                    ]),

                Section::make('Detail Ulasan')
                    ->description('Rating dan isi ulasan dari pelanggan.')
                    ->icon('heroicon-o-star')
                    ->schema([
                        Select::make('rating')
                            ->label('Rating')
                            ->required()
                            ->options([
                                5 => '⭐⭐⭐⭐⭐ — Luar Biasa (5)',
                                4 => '⭐⭐⭐⭐ — Bagus (4)',
                                3 => '⭐⭐⭐ — Cukup (3)',
                                2 => '⭐⭐ — Kurang (2)',
                                1 => '⭐ — Sangat Kurang (1)',
                            ])
                            ->default(5)
                            ->native(false),

                        Textarea::make('comment')
                            ->label('Isi Ulasan')
                            ->placeholder('Tulis ulasan pelanggan di sini...')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                    ]),

                Section::make('Moderasi')
                    ->description('Pengaturan persetujuan dan status unggulan ulasan.')
                    ->icon('heroicon-o-shield-check')
                    ->schema([
                        Grid::make(2)->schema([
                            Toggle::make('is_approved')
                                ->label('Disetujui')
                                ->default(false)
                                ->inline(false)
                                ->helperText('Setujui ulasan untuk ditampilkan di website.'),

                            Toggle::make('is_featured')
                                ->label('Unggulan')
                                ->default(false)
                                ->inline(false)
                                ->helperText('Tampilkan ulasan ini secara khusus di halaman utama.'),
                        ]),

                        DateTimePicker::make('approved_at')
                            ->label('Waktu Persetujuan')
                            ->disabled()
                            ->dehydrated(false)
                            ->native(false),
                    ])
                    ->collapsible(),
            ]);
    }
}
