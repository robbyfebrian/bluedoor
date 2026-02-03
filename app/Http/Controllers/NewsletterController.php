<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        $subscription = NewsletterSubscription::where('email', $validated['email'])->first();

        if ($subscription) {
            if ($subscription->is_subscribed) {
                return back()->with('info', 'You are already subscribed to our newsletter!');
            }

            $subscription->update([
                'is_subscribed' => true,
                'unsubscribed_at' => null,
                'name' => $validated['name'] ?? $subscription->name,
            ]);
        } else {
            NewsletterSubscription::create([
                'email' => $validated['email'],
                'name' => $validated['name'] ?? null,
                'is_subscribed' => true,
                'verified_at' => now(),
            ]);
        }

        return back()->with('success', 'Successfully subscribed to our newsletter!');
    }
}
