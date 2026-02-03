<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Post Content')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)))
                            ->label('Title'),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Auto-generated from title')
                            ->label('Slug'),
                        Textarea::make('excerpt')
                            ->required()
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull()
                            ->label('Excerpt')
                            ->helperText('Brief summary for previews'),
                        RichEditor::make('content')
                            ->required()
                            ->columnSpanFull()
                            ->label('Content')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'link',
                                'heading',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                                'codeBlock',
                                'undo',
                                'redo',
                            ]),
                    ]),

                Section::make('Featured Image')
                    ->schema([
                        FileUpload::make('featured_image')
                            ->image()
                            ->disk('public')
                            ->directory('blog')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->columnSpanFull()
                            ->label('Featured Image'),
                    ])
                    ->collapsible(),

                Section::make('Metadata')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('category')
                                    ->required()
                                    ->options([
                                        'news' => 'News',
                                        'recipes' => 'Recipes',
                                        'coffee_tips' => 'Coffee Tips',
                                        'events' => 'Events',
                                        'behind_the_scenes' => 'Behind the Scenes',
                                    ])
                                    ->default('news')
                                    ->native(false)
                                    ->label('Category'),
                                Select::make('author_id')
                                    ->relationship('author', 'name')
                                    ->required()
                                    ->default(fn () => auth()->guard()->id())
                                    ->label('Author'),
                            ]),
                        TagsInput::make('tags')
                            ->suggestions([
                                'coffee',
                                'espresso',
                                'latte',
                                'cappuccino',
                                'brewing',
                                'barista',
                                'recipe',
                                'events',
                            ])
                            ->columnSpanFull()
                            ->label('Tags'),
                    ]),

                Section::make('Publishing')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('status')
                                    ->required()
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Published',
                                    ])
                                    ->default('draft')
                                    ->native(false)
                                    ->label('Status'),
                                DateTimePicker::make('published_at')
                                    ->label('Publish Date')
                                    ->helperText('Leave empty to use creation date'),
                            ]),
                    ]),
            ]);
    }
}
