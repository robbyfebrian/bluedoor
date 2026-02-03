<?php

namespace App\Filament\Resources\GalleryImages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GalleryImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Image Details')
                    ->schema([
                        FileUpload::make('image_path')
                            ->image()
                            ->required()
                            ->disk('public')
                            ->directory('gallery')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->columnSpanFull()
                            ->label('Photo'),
                        TextInput::make('title')
                            ->maxLength(255)
                            ->label('Title'),
                        Textarea::make('description')
                            ->maxLength(65535)
                            ->rows(3)
                            ->columnSpanFull()
                            ->label('Description'),
                    ]),

                Section::make('Settings')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Select::make('category')
                                    ->required()
                                    ->options([
                                        'coffee' => 'Coffee',
                                        'food' => 'Food',
                                        'ambiance' => 'Ambiance',
                                        'events' => 'Events',
                                    ])
                                    ->default('coffee')
                                    ->native(false)
                                    ->label('Category'),
                                TextInput::make('order')
                                    ->required()
                                    ->numeric()
                                    ->minValue(0)
                                    ->default(0)
                                    ->helperText('Lower numbers appear first')
                                    ->label('Display Order'),
                                Toggle::make('is_active')
                                    ->default(true)
                                    ->label('Active'),
                            ]),
                    ]),
            ]);
    }
}
