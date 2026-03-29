<?php

namespace App\Models;

use App\Enums\NewsletterSubscriptionStatus;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class NewsletterSubscription extends Model
{
    use LogsActivity;

    protected static function booted(): void
    {
        static::creating(function (self $subscription): void {
            if (blank($subscription->status)) {
                $subscription->status = NewsletterSubscriptionStatus::PendingVerification;
            }
        });
    }

    protected $fillable = [
        'email',
        'name',
        'status',
        'is_subscribed',
        'verified_at',
        'unsubscribed_at',
    ];

    protected $casts = [
        'status' => NewsletterSubscriptionStatus::class,
        'is_subscribed' => 'boolean',
        'verified_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
    ];

    public function scopeSubscribed($query)
    {
        return $query->where('status', NewsletterSubscriptionStatus::Subscribed->value);
    }

    public function scopeVerified($query)
    {
        return $query->whereNotNull('verified_at');
    }

    public function canTransitionTo(NewsletterSubscriptionStatus $targetStatus): bool
    {
        $current = $this->status instanceof NewsletterSubscriptionStatus
            ? $this->status
            : NewsletterSubscriptionStatus::from((string) $this->status);

        return $current->canTransitionTo($targetStatus);
    }

    public function transitionTo(NewsletterSubscriptionStatus $targetStatus): void
    {
        if (! $this->canTransitionTo($targetStatus)) {
            throw new \DomainException("Invalid subscription transition from {$this->status->value} to {$targetStatus->value}.");
        }

        $updates = ['status' => $targetStatus];

        if ($targetStatus === NewsletterSubscriptionStatus::Subscribed) {
            $updates['is_subscribed'] = true;
            $updates['verified_at'] = $this->verified_at ?? now();
            $updates['unsubscribed_at'] = null;
        }

        if ($targetStatus === NewsletterSubscriptionStatus::Unsubscribed) {
            $updates['is_subscribed'] = false;
            $updates['unsubscribed_at'] = now();
        }

        $this->update($updates);
    }

    public function unsubscribe(): void
    {
        $this->transitionTo(NewsletterSubscriptionStatus::Unsubscribed);
    }

    public function verify(): void
    {
        $this->transitionTo(NewsletterSubscriptionStatus::Subscribed);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['email', 'status', 'is_subscribed', 'verified_at', 'unsubscribed_at'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Newsletter subscription {$eventName}: {$this->email}");
    }
}
