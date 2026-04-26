<?php

namespace App\Filament\Resources\Employees\Schemas;

use App\Models\Branch;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EmployeeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Karyawan')
                    ->description('Data diri dan posisi karyawan.')
                    ->icon('heroicon-o-user')
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(4)->schema([
                            TextInput::make('name')
                                ->label('Nama Lengkap')
                                ->placeholder('Contoh: Dewi Rahayu')
                                ->required()
                                ->helperText('Nama lengkap karyawan')
                                ->maxLength(255),

                            TextInput::make('position')
                                ->label('Jabatan')
                                ->placeholder('Contoh: Head Barista, Pastry Chef')
                                ->required()
                                ->helperText('Posisi atau jabatan karyawan')
                                ->maxLength(255),

                            Select::make('branch_id')
                                ->label('Cabang')
                                ->options(Branch::active()->pluck('name', 'id'))
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->placeholder('Pilih cabang...')
                                ->helperText('Cabang tempat karyawan ini bertugas'),

                            TextInput::make('email')
                                ->label('Email')
                                ->placeholder('nama@bluedoor.id')
                                ->email()
                                ->unique(ignoreRecord: true)
                                ->helperText('Email karyawan untuk keperluan internal')
                                ->maxLength(255),
                        ]),

                        FileUpload::make('photo')
                            ->label('Foto')
                            ->image()
                            ->directory('employees')
                            ->imageEditor()
                            ->helperText('Gunakan foto dengan rasio 1:1 untuk hasil terbaik.')
                            ->columnSpanFull(),

                        Textarea::make('bio')
                            ->label('Biografi')
                            ->placeholder('Ceritakan sedikit tentang karyawan ini...')
                            ->rows(3)
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Karyawan Aktif')
                            ->default(true)
                            ->inline(false)
                            ->helperText('Nonaktifkan untuk menyembunyikan dari halaman publik.'),
                    ]),
            ]);
    }
}
