<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Customer Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('customer_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Name'),
                                TextInput::make('customer_email')
                                    ->email()
                                    ->maxLength(255)
                                    ->label('Email'),
                            ]),
                    ]),

                Section::make('Review Details')
                    ->schema([
                        TextInput::make('rating')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(5)
                            ->suffix('/ 5')
                            ->default(5)
                            ->label('Rating (1-5)'),
                        Textarea::make('comment')
                            ->required()
                            ->maxLength(65535)
                            ->rows(5)
                            ->columnSpanFull()
                            ->label('Review Comment'),
                    ]),

                Section::make('Moderation')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Toggle::make('is_approved')
                                    ->label('Approved')
                                    ->default(false)
                                    ->helperText('Approve this review to display on website'),
                                Toggle::make('is_featured')
                                    ->label('Featured')
                                    ->default(false)
                                    ->helperText('Feature this review on homepage'),
                            ]),
                        DateTimePicker::make('approved_at')
                            ->label('Approved At')
                            ->disabled()
                            ->dehydrated(false),
                    ])
                    ->collapsible(),
            ]);
    }
}
