<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Review extends Model
{
    use LogsActivity;
    protected $fillable = [
        'customer_name',
        'customer_email',
        'rating',
        'comment',
        'is_approved',
        'is_featured',
        'approved_at',
        'approved_by',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_approved' => 'boolean',
        'is_featured' => 'boolean',
        'approved_at' => 'datetime',
    ];

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public static function averageRating(): float
    {
        return static::approved()->avg('rating') ?? 0.0;
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['customer_name', 'rating', 'is_approved', 'is_featured', 'approved_by'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Review {$eventName} by {$this->customer_name}");
    }}
