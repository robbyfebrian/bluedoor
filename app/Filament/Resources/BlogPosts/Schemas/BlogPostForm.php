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
                Section::make('Konten Posting')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('title')
                                ->label('Judul')
                                ->placeholder('Judul artikel blog')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->label('Slug URL')
                                ->required()
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->helperText('Otomatis dibuat dari judul.')
                                ->dehydrated()
                                ->disabled(fn ($record) => $record !== null),
                        ]),

                        Textarea::make('excerpt')
                            ->label('Ringkasan')
                            ->placeholder('Ringkasan singkat artikel (tampil pada preview)')
                            ->required()
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull(),

                        RichEditor::make('content')
                            ->label('Isi Artikel')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'italic', 'underline', 'strike',
                                'link', 'heading', 'bulletList', 'orderedList',
                                'blockquote', 'codeBlock', 'undo', 'redo',
                            ]),
                    ]),

                Section::make('Gambar Unggulan')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        FileUpload::make('featured_image')
                            ->label('Gambar Unggulan')
                            ->image()
                            ->disk('public')
                            ->directory('blog')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),

                Section::make('Metadata & Kategori')
                    ->icon('heroicon-o-tag')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('category')
                                ->label('Kategori')
                                ->required()
                                ->options([
                                    'news'    => 'Berita',
                                    'recipes' => 'Resep',
                                    'events'  => 'Acara',
                                    'tips'    => 'Tips & Trik',
                                ])
                                ->default('news')
                                ->native(false),

                            Select::make('author_id')
                                ->label('Penulis')
                                ->relationship('author', 'name')
                                ->required()
                                ->searchable()
                                ->preload()
                                ->default(fn () => auth()->guard()->id()),
                        ]),

                        TagsInput::make('tags')
                            ->label('Tag')
                            ->placeholder('Tambah tag...')
                            ->suggestions(['kopi', 'espresso', 'latte', 'cappuccino', 'manual brew', 'barista', 'resep', 'acara'])
                            ->columnSpanFull(),
                    ]),

                Section::make('Penerbitan')
                    ->icon('heroicon-o-calendar')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('status')
                                ->label('Status')
                                ->required()
                                ->options([
                                    'draft'     => 'Draf',
                                    'published' => 'Terbit',
                                ])
                                ->default('draft')
                                ->native(false),

                            DateTimePicker::make('published_at')
                                ->label('Tanggal Terbit')
                                ->helperText('Kosongkan untuk menggunakan tanggal pembuatan.')
                                ->native(false),
                        ]),
                    ]),
            ]);
    }
}
