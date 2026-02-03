<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class JobApplication extends Model
{
    use LogsActivity;
    protected $fillable = [
        'job_opening_id',
        'name',
        'email',
        'phone',
        'cover_letter',
        'cv_path',
        'status',
        'admin_notes',
        'reviewed_at',
        'reviewed_by',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
    ];

    public function jobOpening(): BelongsTo
    {
        return $this->belongsTo(JobOpening::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function getCvUrlAttribute(): ?string
    {
        return $this->cv_path ? Storage::url($this->cv_path) : null;
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeReviewing($query)
    {
        return $query->where('status', 'reviewing');
    }

    public function scopeShortlisted($query)
    {
        return $query->where('status', 'shortlisted');
    }

    public function getStatusBadgeColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'warning',
            'reviewing' => 'info',
            'shortlisted' => 'success',
            'rejected' => 'danger',
            'hired' => 'success',
            default => 'secondary',
        };
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['applicant_name', 'status', 'reviewed_by', 'notes'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Job application {$eventName}: {$this->applicant_name} - Status: {$this->status}");
    }
}
