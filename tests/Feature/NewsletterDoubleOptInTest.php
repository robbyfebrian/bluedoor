<?php

use App\Enums\NewsletterSubscriptionStatus;
use App\Models\NewsletterSubscription;
use Illuminate\Support\Facades\Mail;

it('creates pending subscription and sends verification email', function () {
    Mail::fake();

    $response = $this->post(route('newsletter.subscribe'), [
        'email' => 'candidate@example.com',
        'name' => 'Candidate',
    ]);

    $response->assertSessionHas('success');

    $subscription = NewsletterSubscription::where('email', 'candidate@example.com')->first();

    expect($subscription)->not()->toBeNull();
    expect($subscription->status)->toBe(NewsletterSubscriptionStatus::PendingVerification);
    expect($subscription->is_subscribed)->toBeFalse();
    expect($subscription->verification_token)->not()->toBeNull();
    expect($subscription->verification_sent_at)->not()->toBeNull();
});

it('verifies pending subscription via token', function () {
    $subscription = NewsletterSubscription::create([
        'email' => 'pending@example.com',
        'name' => 'Pending User',
        'status' => NewsletterSubscriptionStatus::PendingVerification,
        'is_subscribed' => false,
        'verification_token' => 'verify-token-123',
    ]);

    $response = $this->get(route('newsletter.verify', ['token' => 'verify-token-123']));

    $response->assertRedirect(route('home'));

    $subscription->refresh();

    expect($subscription->status)->toBe(NewsletterSubscriptionStatus::Subscribed);
    expect($subscription->is_subscribed)->toBeTrue();
    expect($subscription->verified_at)->not()->toBeNull();
    expect($subscription->verification_token)->toBeNull();
});
