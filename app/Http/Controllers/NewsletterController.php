<?php

namespace App\Http\Controllers;

use App\Enums\NewsletterSubscriptionStatus;
use App\Models\NewsletterSubscription;
use App\Services\Newsletter\NewsletterSubscriptionService;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function showUnsubscribeForm(Request $request)
    {
        return inertia('NewsletterUnsubscribe', [
            'email' => $request->query('email', ''),
        ]);
    }

    public function subscribe(Request $request, NewsletterSubscriptionService $newsletterSubscriptionService)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        $verificationRequested = $newsletterSubscriptionService->requestVerification(
            $validated['email'],
            $validated['name'] ?? null,
        );

        if (! $verificationRequested) {
            return back()->with('info', 'You are already subscribed to our newsletter!');
        }

        return back()->with('success', 'Please check your email and confirm your subscription.');
    }

    public function verify(string $token)
    {
        $subscription = NewsletterSubscription::where('verification_token', $token)->first();

        if (! $subscription) {
            return redirect()->route('home')
                ->with('error', 'Invalid or expired verification token.');
        }

        if ($subscription->status === NewsletterSubscriptionStatus::Subscribed) {
            return redirect()->route('home')
                ->with('info', 'Your subscription is already active.');
        }

        $subscription->verify();

        return redirect()->route('home')
            ->with('success', 'Newsletter subscription verified successfully!');
    }

    public function unsubscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $subscription = NewsletterSubscription::where('email', $validated['email'])->first();

        if (! $subscription) {
            return back()->withErrors([
                'email' => 'Email is not registered as an active subscriber.',
            ])->withInput();
        }

        if ($subscription->status === NewsletterSubscriptionStatus::Unsubscribed) {
            return back()->with('info', 'You are already unsubscribed.');
        }

        $subscription->unsubscribe();

        return back()->with('success', 'Successfully unsubscribed from our newsletter.');
    }
}
