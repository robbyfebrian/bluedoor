<?php

namespace App\Filament\Resources\BlogPosts\Tables;

use Filament\Actions\BulkActionGroup;
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
            ->columns([
                ImageColumn::make('featured_image')
                    ->disk('public')
                    ->size(60)
                    ->label('Image'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->label('Title'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'published' => 'success',
                        'draft' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state))
                    ->sortable()
                    ->label('Status'),
                TextColumn::make('category')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state) => ucwords(str_replace('_', ' ', $state)))
                    ->sortable()
                    ->label('Category'),
                TextColumn::make('author.name')
                    ->searchable()
                    ->sortable()
                    ->label('Author'),
                TextColumn::make('views')
                    ->numeric()
                    ->sortable()
                    ->label('Views')
                    ->suffix(' 👁'),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Published')
                    ->placeholder('Not published'),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),
                SelectFilter::make('category')
                    ->options([
                        'news' => 'News',
                        'recipes' => 'Recipes',
                        'coffee_tips' => 'Coffee Tips',
                        'events' => 'Events',
                        'behind_the_scenes' => 'Behind the Scenes',
                    ]),
                SelectFilter::make('author')
                    ->relationship('author', 'name'),
            ])
            ->recordActions([
                Action::make('publish')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('publish', $record), 403);

                        $record->update([
                            'status' => 'published',
                            'published_at' => $record->published_at ?? now(),
                        ]);
                    })
                    ->visible(fn ($record) => $record->status === 'draft' && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('publish', $record))
                    ->requiresConfirmation(),
                Action::make('unpublish')
                    ->icon('heroicon-o-x-circle')
                    ->color('warning')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('unpublish', $record), 403);
                        $record->update(['status' => 'draft']);
                    })
                    ->visible(fn ($record) => $record->status === 'published' && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('unpublish', $record))
                    ->requiresConfirmation(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
