<?php

namespace App\Filament\Resources\JobApplications\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class JobApplicationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Application Details')
                    ->schema([
                        Select::make('job_opening_id')
                            ->relationship('jobOpening', 'title')
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('phone')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        Textarea::make('cover_letter')
                            ->rows(4)
                            ->columnSpanFull(),
                        FileUpload::make('cv_path')
                            ->label('CV/Resume')
                            ->acceptedFileTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                            ->directory('cvs')
                            ->downloadable()
                            ->openable()
                            ->columnSpanFull()
                            ->required(),
                    ]),
                Section::make('Admin Review')
                    ->schema([
                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'reviewing' => 'Reviewing',
                                'shortlisted' => 'Shortlisted',
                                'rejected' => 'Rejected',
                                'hired' => 'Hired',
                            ])
                            ->required()
                            ->default('pending'),
                        Textarea::make('admin_notes')
                            ->rows(4)
                            ->columnSpanFull(),
                        Select::make('reviewed_by')
                            ->relationship('reviewer', 'name')
                            ->searchable()
                            ->preload(),
                        DateTimePicker::make('reviewed_at')
                            ->native(false),
                    ])
                    ->collapsed(),
            ]);
    }
}
