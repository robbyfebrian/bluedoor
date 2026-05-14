<?php

namespace App\Services\Newsletter;

use App\Enums\NewsletterSubscriptionStatus;
use App\Models\NewsletterSubscription;
use Illuminate\Support\Facades\Mail;

class NewsletterSubscriptionService
{
    /**
     * Ensure a subscription enters pending_verification and send verification email.
     *
     * Returns false if the user is already subscribed.
     */
    public function requestVerification(string $email, ?string $name = null): bool
    {
        $subscription = NewsletterSubscription::query()
            ->where('email', $email)
            ->first();

        if ($subscription && $subscription->status === NewsletterSubscriptionStatus::Subscribed) {
            return false;
        }

        if ($subscription) {
            $subscription->name = $name ?? $subscription->name;
            $subscription->save();
        } else {
            $subscription = NewsletterSubscription::create([
                'email' => $email,
                'name' => $name,
                'status' => NewsletterSubscriptionStatus::PendingVerification,
                'is_subscribed' => false,
            ]);
        }

        $subscription->startVerification();

        Mail::send('emails.newsletter-verification', [
            'subscription' => $subscription,
            'verificationUrl' => route('newsletter.verify', ['token' => $subscription->verification_token]),
        ], function ($message) use ($subscription) {
            $message->to($subscription->email, $subscription->name)
                ->subject('Please confirm your newsletter subscription');
        });

        return true;
    }
}
