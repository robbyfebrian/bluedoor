<?php

namespace App\Models;

use App\Enums\JobApplicationStatus;
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
        'status' => JobApplicationStatus::class,
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
        return $query->where('status', JobApplicationStatus::Pending->value);
    }

    public function scopeReviewing($query)
    {
        return $query->where('status', JobApplicationStatus::Reviewing->value);
    }

    public function scopeShortlisted($query)
    {
        return $query->where('status', JobApplicationStatus::Shortlisted->value);
    }

    public function canTransitionTo(JobApplicationStatus $targetStatus): bool
    {
        $current = $this->status instanceof JobApplicationStatus
            ? $this->status
            : JobApplicationStatus::from((string) $this->status);

        return $current->canTransitionTo($targetStatus);
    }

    public function transitionTo(JobApplicationStatus $targetStatus, ?int $reviewerId = null, ?string $adminNotes = null): void
    {
        if (! $this->canTransitionTo($targetStatus)) {
            throw new \DomainException("Invalid status transition from {$this->status->value} to {$targetStatus->value}.");
        }

        $this->status = $targetStatus;
        $this->reviewed_at = now();

        if ($reviewerId !== null) {
            $this->reviewed_by = $reviewerId;
        }

        if ($adminNotes !== null) {
            $this->admin_notes = $adminNotes;
        }

        $this->save();
    }

    public function getStatusBadgeColorAttribute(): string
    {
        $status = $this->status instanceof JobApplicationStatus
            ? $this->status
            : JobApplicationStatus::from((string) $this->status);

        return match($status) {
            JobApplicationStatus::Pending => 'warning',
            JobApplicationStatus::Reviewing => 'info',
            JobApplicationStatus::Shortlisted => 'success',
            JobApplicationStatus::Rejected => 'danger',
            JobApplicationStatus::Hired => 'success',
            default => 'secondary',
        };
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'status', 'reviewed_by', 'admin_notes'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Job application {$eventName}: {$this->name} - Status: {$this->status->value}");
    }
}
