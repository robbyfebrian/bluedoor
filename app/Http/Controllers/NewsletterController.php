<?php

namespace App\Http\Controllers;

use App\Enums\NewsletterSubscriptionStatus;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function showUnsubscribeForm(Request $request)
    {
        return inertia('NewsletterUnsubscribe', [
            'email' => $request->query('email', ''),
        ]);
    }

    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        $subscription = NewsletterSubscription::where('email', $validated['email'])->first();

        if ($subscription) {
            if ($subscription->status === NewsletterSubscriptionStatus::Subscribed) {
                return back()->with('info', 'You are already subscribed to our newsletter!');
            }

            $subscription->name = $validated['name'] ?? $subscription->name;
            $subscription->save();
            $subscription->transitionTo(NewsletterSubscriptionStatus::Subscribed);
        } else {
            NewsletterSubscription::create([
                'email' => $validated['email'],
                'name' => $validated['name'] ?? null,
                'status' => NewsletterSubscriptionStatus::Subscribed,
                'is_subscribed' => true,
                'verified_at' => now(),
            ]);
        }

        return back()->with('success', 'Successfully subscribed to our newsletter!');
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
