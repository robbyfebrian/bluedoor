<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Branch extends Model
{
    use LogsActivity;
    protected $fillable = [
        'name',
        'slug',
        'code',
        'address',
        'city',
        'province',
        'postal_code',
        'phone',
        'email',
        'opening_time',
        'closing_time',
        'is_active',
        'manager_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($branch) {
            if (empty($branch->slug)) {
                $branch->slug = Str::slug($branch->name);
            }
        });
    }

    // Relationships
    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function jobOpenings(): HasMany
    {
        return $this->hasMany(JobOpening::class);
    }

    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class);
    }

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Helper methods
    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->city}, {$this->province} {$this->postal_code}";
    }

    public function isOpen(): bool
    {
        $now = now()->format('H:i:s');
        return $this->is_active &&
               $now >= $this->opening_time->format('H:i:s') &&
               $now <= $this->closing_time->format('H:i:s');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'code', 'city', 'is_active', 'manager_id'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Branch {$eventName}: {$this->name} ({$this->code})");
    }
}