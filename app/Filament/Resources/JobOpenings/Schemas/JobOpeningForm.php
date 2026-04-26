<?php

namespace App\Filament\Resources\JobOpenings\Schemas;

use App\Models\Branch;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;
use Illuminate\Support\Str;

class JobOpeningForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Lowongan')
                    ->description('Detail umum posisi yang dibuka.')
                    ->icon('heroicon-o-briefcase')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('title')
                                ->label('Judul Posisi')
                                ->placeholder('Contoh: Barista, Shift Supervisor')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->label('Slug')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->placeholder('Otomatis dari judul')
                                ->disabled()
                                ->dehydrated(),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('branch_id')
                                ->label('Cabang')
                                ->options(Branch::active()->pluck('name', 'id'))
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->placeholder('Semua cabang')
                                ->helperText('Kosongkan jika berlaku untuk semua cabang.'),

                            Select::make('type')
                                ->label('Tipe Pekerjaan')
                                ->required()
                                ->options([
                                    'full-time'  => 'Full Time',
                                    'part-time'  => 'Part Time',
                                    'contract'   => 'Kontrak',
                                    'internship' => 'Magang',
                                ])
                                ->default('full-time')
                                ->native(false),

                            TextInput::make('location')
                                ->label('Lokasi')
                                ->placeholder('Contoh: Jakarta Pusat, Bandung')
                                ->required()
                                ->maxLength(255),
                        ]),

                        DatePicker::make('closes_at')
                            ->label('Tanggal Tutup Lamaran')
                            ->helperText('Kosongkan jika tidak ada batas waktu.')
                            ->native(false),
                    ]),

                Section::make('Deskripsi Pekerjaan')
                    ->description('Detail pekerjaan, persyaratan, dan tanggung jawab.')
                    ->icon('heroicon-o-document-text')
                    ->columnSpanFull()
                    ->schema([
                        RichEditor::make('description')
                            ->label('Deskripsi Umum')
                            ->required()
                            ->columnSpanFull(),

                        RichEditor::make('requirements')
                            ->label('Persyaratan')
                            ->columnSpanFull(),

                        RichEditor::make('responsibilities')
                            ->label('Tanggung Jawab')
                            ->columnSpanFull(),
                    ]),

                Section::make('Kompensasi & Status')
                    ->description('Rentang gaji dan status aktif lowongan.')
                    ->icon('heroicon-o-banknotes')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('salary_min')
                                ->label('Gaji Minimum')
                                ->prefix('Rp')
                                ->mask(RawJs::make("IMask.createMask({
                                    mask: Number,
                                    scale: 0,
                                    thousandsSeparator: '.',
                                    radix: ',',
                                    normalizeZeros: true,
                                    min: 0,
                                })"))
                                ->dehydrateStateUsing(fn ($state) => $state ? (int) str_replace('.', '', (string) $state) : null)
                                ->formatStateUsing(fn ($state) => $state ? number_format((float) $state, 0, ',', '.') : null)
                                ->placeholder('0'),

                            TextInput::make('salary_max')
                                ->label('Gaji Maksimum')
                                ->prefix('Rp')
                                ->mask(RawJs::make("IMask.createMask({
                                    mask: Number,
                                    scale: 0,
                                    thousandsSeparator: '.',
                                    radix: ',',
                                    normalizeZeros: true,
                                    min: 0,
                                })"))
                                ->dehydrateStateUsing(fn ($state) => $state ? (int) str_replace('.', '', (string) $state) : null)
                                ->formatStateUsing(fn ($state) => $state ? number_format((float) $state, 0, ',', '.') : null)
                                ->placeholder('0'),


                            Toggle::make('is_active')
                                ->label('Lowongan Aktif')
                                ->default(true)
                                ->inline(false)
                                ->helperText('Nonaktifkan untuk menyembunyikan lowongan dari halaman publik.'),
                        ]),
                    ]),
            ]);
    }
}
