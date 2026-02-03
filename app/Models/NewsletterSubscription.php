<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubscription extends Model
{
    protected $fillable = [
        'email',
        'name',
        'is_subscribed',
        'verified_at',
        'unsubscribed_at',
    ];

    protected $casts = [
        'is_subscribed' => 'boolean',
        'verified_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
    ];

    public function scopeSubscribed($query)
    {
        return $query->where('is_subscribed', true)
            ->whereNull('unsubscribed_at');
    }

    public function scopeVerified($query)
    {
        return $query->whereNotNull('verified_at');
    }

    public function unsubscribe(): void
    {
        $this->update([
            'is_subscribed' => false,
            'unsubscribed_at' => now(),
        ]);
    }

    public function verify(): void
    {
        $this->update([
            'verified_at' => now(),
        ]);
    }
}
