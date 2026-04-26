<?php

namespace App\Filament\Resources\Reviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Gate;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateIcon('heroicon-o-star')
            ->emptyStateHeading('Belum Ada Ulasan')
            ->emptyStateDescription('Belum ada ulasan yang ditambahkan, anda dapat menambahkan ulasan secara manual lewat button "Tambah Ulasan" di atas')
            ->columns([
                TextColumn::make('customer_name')
                    ->label('Pelanggan')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('rating')
                    ->label('Rating')
                    ->badge()
                    ->color(fn ($state) => match (true) {
                        $state >= 4 => 'success',
                        $state >= 3 => 'warning',
                        default     => 'danger',
                    })
                    ->suffix(' ⭐')
                    ->sortable(),

                TextColumn::make('comment')
                    ->label('Ulasan')
                    ->limit(60)
                    ->searchable(),

                ToggleColumn::make('is_approved')
                    ->label('Disetujui')
                    ->alignCenter(),

                ToggleColumn::make('is_featured')
                    ->label('Unggulan')
                    ->alignCenter(),

                TextColumn::make('approver.name')
                    ->label('Disetujui Oleh')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Dikirim')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_approved')
                    ->label('Status Persetujuan')
                    ->placeholder('Semua Ulasan')
                    ->trueLabel('Sudah Disetujui')
                    ->falseLabel('Menunggu Persetujuan'),

                TernaryFilter::make('is_featured')
                    ->label('Unggulan')
                    ->placeholder('Semua Ulasan')
                    ->trueLabel('Unggulan')
                    ->falseLabel('Bukan Unggulan'),

                SelectFilter::make('rating')
                    ->label('Rating')
                    ->options([
                        5 => '⭐⭐⭐⭐⭐ (5)',
                        4 => '⭐⭐⭐⭐ (4)',
                        3 => '⭐⭐⭐ (3)',
                        2 => '⭐⭐ (2)',
                        1 => '⭐ (1)',
                    ]),
            ])
            ->recordActions([
                Action::make('approve')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function ($record) {
                        abort_unless(auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('approve', $record), 403);
                        $record->update([
                            'is_approved' => true,
                            'approved_at' => now(),
                            'approved_by' => auth()->guard()->id(),
                        ]);
                    })
                    ->visible(fn ($record) => !$record->is_approved && auth()->guard()->check() && Gate::forUser(auth()->guard()->user())->allows('approve', $record))
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
