<?php

namespace App\Filament\Resources\JobApplications\Schemas;

use App\Enums\JobApplicationStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class JobApplicationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Lamaran')
                    ->description('Informasi umum dan dokumen pelamar.')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Select::make('job_opening_id')
                            ->label('Posisi yang Dilamar')
                            ->relationship('jobOpening', 'title')
                            ->required()
                            ->searchable()
                            ->preload(),

                        Grid::make(2)->schema([
                            TextInput::make('name')
                                ->label('Nama Lengkap')
                                ->placeholder('Nama sesuai KTP')
                                ->required()
                                ->maxLength(255),

                            TextInput::make('email')
                                ->label('Alamat Email')
                                ->placeholder('pelamar@email.com')
                                ->email()
                                ->required()
                                ->maxLength(255),
                        ]),

                        TextInput::make('phone')
                            ->label('Nomor HP')
                            ->placeholder('08xxxxxxxxxx')
                            ->tel()
                            ->required()
                            ->maxLength(20),

                        Textarea::make('cover_letter')
                            ->label('Surat Lamaran')
                            ->placeholder('Tuliskan motivasi dan latar belakang pelamar...')
                            ->rows(4)
                            ->columnSpanFull(),

                        FileUpload::make('cv_path')
                            ->label('CV / Resume')
                            ->acceptedFileTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                            ->directory('cvs')
                            ->downloadable()
                            ->openable()
                            ->helperText('Format: PDF atau Word. Maks 10MB.')
                            ->columnSpanFull()
                            ->required(),
                    ]),

                Section::make('Tinjauan Admin')
                    ->description('Status lamaran dan catatan internal tim HR.')
                    ->icon('heroicon-o-clipboard-document-check')
                    ->schema([
                        Select::make('status')
                            ->label('Status Lamaran')
                            ->options(JobApplicationStatus::options())
                            ->required()
                            ->default(JobApplicationStatus::Pending->value)
                            ->disabledOn('edit')
                            ->helperText('Status berubah melalui workflow actions (Tinjau, Seleksi, Terima, Tolak).'),

                        Textarea::make('admin_notes')
                            ->label('Catatan Admin')
                            ->placeholder('Catatan internal mengenai pelamar ini...')
                            ->rows(4)
                            ->columnSpanFull(),

                        Grid::make(2)->schema([
                            Select::make('reviewed_by')
                                ->label('Ditinjau Oleh')
                                ->relationship('reviewer', 'name')
                                ->searchable()
                                ->preload(),

                            DateTimePicker::make('reviewed_at')
                                ->label('Waktu Tinjauan')
                                ->native(false),
                        ]),
                    ])
                    ->collapsed(),
            ]);
    }
}
