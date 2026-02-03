<?php

namespace App\Filament\Resources\JobOpenings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class JobOpeningForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Select::make('type')
                    ->required()
                    ->options([
                        'full-time' => 'Full Time',
                        'part-time' => 'Part Time',
                        'contract' => 'Contract',
                        'internship' => 'Internship',
                    ])
                    ->default('full-time'),
                TextInput::make('location')
                    ->required()
                    ->maxLength(255),
                RichEditor::make('description')
                    ->required()
                    ->columnSpanFull(),
                RichEditor::make('requirements')
                    ->columnSpanFull(),
                RichEditor::make('responsibilities')
                    ->columnSpanFull(),
                TextInput::make('salary_min')
                    ->numeric()
                    ->prefix('$')
                    ->label('Minimum Salary'),
                TextInput::make('salary_max')
                    ->numeric()
                    ->prefix('$')
                    ->label('Maximum Salary'),
                DatePicker::make('closes_at')
                    ->label('Closing Date')
                    ->native(false),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
