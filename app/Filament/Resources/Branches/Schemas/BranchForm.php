<?php

namespace App\Filament\Resources\Branches\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BranchForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Cabang')
                    ->description('Nama dan identifikasi unik cabang.')
                    ->icon('heroicon-o-building-storefront')
                    ->columnSpanFull()
                    ->columns(3)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Cabang')
                            ->placeholder('Contoh: Blue Door Coffee – Sudirman')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set): void {
                                $set('slug', Str::slug($state));
                                $set('code', self::generateBranchCode($state));
                            }),

                        TextInput::make('code')
                            ->label('Kode Cabang')
                            ->placeholder('otomatis-generate')
                            ->required()
                            ->maxLength(20)
                            ->disabled()
                            ->dehydrated()
                            ->unique(ignoreRecord: true)
                            ->helperText('Otomatis Generate'),

                        TextInput::make('slug')
                            ->label('Slug URL')
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated()
                            ->unique(ignoreRecord: true)
                            ->placeholder('otomatis-dari-nama')
                            ->dehydrated()
                            ->helperText('Otomatis Generate'),

                         Textarea::make('address')
                            ->label('Alamat Lengkap')
                            ->placeholder('Jl. Contoh No. 1, Kelurahan, Kecamatan')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),

                        TextInput::make('city')
                            ->label('Kota')
                            ->placeholder('Jakarta Pusat')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('province')
                            ->label('Provinsi')
                            ->placeholder('DKI Jakarta')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('postal_code')
                            ->label('Kode Pos')
                            ->placeholder('10220')
                            ->maxLength(10),
                    ]),

                Section::make('Kontak')
                    ->description('Informasi kontak publik cabang.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('phone')
                                ->label('Nomor Telepon')
                                ->placeholder('(021) 1234-5678')
                                ->tel()
                                ->required()
                                ->maxLength(20),

                            TextInput::make('email')
                                ->label('Email Cabang')
                                ->placeholder('namalocal@bluedoor.id')
                                ->email()
                                ->maxLength(255),
                        ]),
                    ]),

                Section::make('Jam Operasional')
                    ->description('Waktu buka dan tutup cabang setiap harinya.')
                    ->icon('heroicon-o-clock')
                    ->schema([
                        Grid::make(2)->schema([
                            TimePicker::make('opening_time')
                                ->label('Jam Buka')
                                ->required()
                                ->default('08:00:00'),

                            TimePicker::make('closing_time')
                                ->label('Jam Tutup')
                                ->required()
                                ->default('22:00:00'),
                        ]),
                    ]),

                Section::make('Manajemen')
                    ->description('Pengaturan manajer dan status aktif cabang.')
                    ->icon('heroicon-o-user-circle')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('manager_id')
                                ->label('Manajer Cabang')
                                ->relationship('manager', 'name')
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->helperText('Pilih pengguna yang bertanggung jawab atas cabang ini.'),

                            Toggle::make('is_active')
                                ->label('Cabang Aktif')
                                ->default(true)
                                ->inline(false)
                                ->helperText('Cabang nonaktif tidak akan muncul di halaman publik.'),
                        ]),
                    ]),
            ]);
    }

    protected static function generateBranchCode(?string $name): string
    {
        if (blank($name)) {
            return '';
        }

        $normalizedName = Str::upper(Str::ascii($name));
        $segments = preg_split('/[^A-Z0-9]+/', $normalizedName, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $initials = collect($segments)
            ->map(fn (string $segment) => Str::substr($segment, 0, 1))
            ->implode('');

        if ($initials === '') {
            $initials = Str::upper(substr(preg_replace('/[^A-Za-z0-9]/', '', $name) ?? '', 0, 3));
        }

        $baseCode = Str::substr($initials, 0, 18);

        return $baseCode . '-01';
    }
}
