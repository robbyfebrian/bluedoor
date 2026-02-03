<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::approved()
            ->with('approver')
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $averageRating = Review::averageRating();
        $totalReviews = $reviews->count();

        return inertia('Reviews', [
            'reviews' => $reviews,
            'averageRating' => $averageRating,
            'totalReviews' => $totalReviews,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Review::create([
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_approved' => false, // Requires admin approval
            'is_featured' => false,
        ]);

        return back()->with('success', 'Thank you for your review! It will be published after moderation.');
    }
}
