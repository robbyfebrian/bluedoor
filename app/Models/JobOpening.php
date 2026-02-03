<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class JobOpening extends Model
{
    protected $fillable = [
        'branch_id',
        'title',
        'slug',
        'description',
        'type',
        'location',
        'requirements',
        'responsibilities',
        'salary_min',
        'salary_max',
        'is_active',
        'closes_at',
    ];

    protected $casts = [
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'is_active' => 'boolean',
        'closes_at' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($opening) {
            if (empty($opening->slug)) {
                $opening->slug = Str::slug($opening->title);
            }
        });
    }

    // Relationships
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('closes_at')
                    ->orWhere('closes_at', '>=', now());
            });
    }

    public function getSalaryRangeAttribute(): ?string
    {
        if ($this->salary_min && $this->salary_max) {
            return '$' . number_format($this->salary_min, 0) . ' - $' . number_format($this->salary_max, 0);
        }

        return null;
    }
}
