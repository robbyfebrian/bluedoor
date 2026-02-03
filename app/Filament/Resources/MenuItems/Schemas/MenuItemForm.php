<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TagsInput;
use Filament\Schemas\Schema;

class MenuItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('menu_category_id')
                    ->relationship('menuCategory', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$')
                    ->step(0.01),
                FileUpload::make('image')
                    ->image()
                    ->directory('menu-items')
                    ->imageEditor()
                    ->columnSpanFull(),
                Toggle::make('is_available')
                    ->default(true),
                Toggle::make('is_featured')
                    ->default(false),
                TagsInput::make('allergens')
                    ->placeholder('Add allergen')
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->minValue(0),
            ]);
    }
}
