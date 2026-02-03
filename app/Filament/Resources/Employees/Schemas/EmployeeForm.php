<?php

namespace App\Filament\Resources\Employees\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class EmployeeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('position')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('photo')
                    ->image()
                    ->directory('employees')
                    ->imageEditor()
                    ->columnSpanFull(),
                Textarea::make('bio')
                    ->rows(4)
                    ->columnSpanFull(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->maxLength(255),
                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->minValue(0),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
