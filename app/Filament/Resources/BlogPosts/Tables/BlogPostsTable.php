<?php

namespace App\Filament\Resources\BlogPosts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;

class BlogPostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-document-text')
            ->emptyStateHeading('Belum Ada Posting Blog')
            ->emptyStateDescription('Belum ada posting blog yang ditambahkan, anda dapat menambahkan secara manual lewat button "Tambah Posting" di atas')
            ->columns([
                ImageColumn::make('featured_image')
                    ->disk('public')
                    ->size(56)
                    ->label('Gambar'),

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->limit(45)
                    ->weight('semibold'),

                TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'news'    => 'Berita',
                        'recipes' => 'Resep',
                        'events'  => 'Acara',
                        'tips'    => 'Tips & Trik',
                        default   => ucfirst($state),
                    })
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'published' => 'success',
                        'draft'     => 'warning',
                        default     => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'published' => 'Terbit',
                        'draft'     => 'Draf',
                        default     => ucfirst($state),
                    })
                    ->sortable(),

                TextColumn::make('author.name')
                    ->label('Penulis')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('views')
                    ->label('Dilihat')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn ($state) => number_format((int) $state, 0, ',', '.') . ' 👁'),

                TextColumn::make('published_at')
                    ->label('Terbit')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->placeholder('Belum terbit'),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'draft'     => 'Draf',
                        'published' => 'Terbit',
                    ]),

                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'news'    => 'Berita',
                        'recipes' => 'Resep',
                        'events'  => 'Acara',
                        'tips'    => 'Tips & Trik',
                    ]),

                SelectFilter::make('author')
                    ->label('Penulis')
                    ->relationship('author', 'name'),
            ])
            ->recordActions([
                Action::make('publish')
                    ->label('Terbitkan')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('publish', $record), 403);
                        $record->update([
                            'status'       => 'published',
                            'published_at' => $record->published_at ?? now(),
                        ]);
                    })
                    ->visible(fn ($record) => $record->status === 'draft' && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('publish', $record))
                    ->requiresConfirmation(),

                Action::make('unpublish')
                    ->label('Jadikan Draf')
                    ->icon('heroicon-o-x-circle')
                    ->color('warning')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('unpublish', $record), 403);
                        $record->update(['status' => 'draft']);
                    })
                    ->visible(fn ($record) => $record->status === 'published' && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('unpublish', $record))
                    ->requiresConfirmation(),

                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped();
    }
}
