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
                Section::make('Branch Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)))
                                    ->label('Branch Name'),
                                TextInput::make('code')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->label('Branch Code')
                                    ->helperText('e.g., BDJ01, BDJ02')
                                    ->placeholder('BDJ01'),
                            ]),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Auto-generated from branch name')
                            ->label('Slug'),
                    ]),

                Section::make('Location Details')
                    ->schema([
                        Textarea::make('address')
                            ->required()
                            ->maxLength(65535)
                            ->rows(3)
                            ->columnSpanFull()
                            ->label('Address'),
                        Grid::make(3)
                            ->schema([
                                TextInput::make('city')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('City'),
                                TextInput::make('province')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Province'),
                                TextInput::make('postal_code')
                                    ->maxLength(255)
                                    ->label('Postal Code'),
                            ]),
                    ]),

                Section::make('Contact Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('phone')
                                    ->tel()
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Phone Number'),
                                TextInput::make('email')
                                    ->email()
                                    ->maxLength(255)
                                    ->label('Email Address'),
                            ]),
                    ]),

                Section::make('Operating Hours')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TimePicker::make('opening_time')
                                    ->required()
                                    ->default('08:00:00')
                                    ->label('Opening Time'),
                                TimePicker::make('closing_time')
                                    ->required()
                                    ->default('22:00:00')
                                    ->label('Closing Time'),
                            ]),
                    ]),

                Section::make('Management')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('manager_id')
                                    ->relationship('manager', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->label('Branch Manager')
                                    ->helperText('Select a user to manage this branch'),
                                Toggle::make('is_active')
                                    ->default(true)
                                    ->label('Active')
                                    ->helperText('Inactive branches won\'t appear on public pages'),
                            ]),
                    ]),
            ]);
    }
}
