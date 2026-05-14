<?php

namespace App\Http\Controllers;

use App\Enums\JobApplicationStatus;
use App\Models\Branch;
use App\Models\JobOpening;
use App\Models\JobApplication;
use App\Services\Newsletter\NewsletterSubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CareersController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JobOpening::with('branch')->active();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('branch') && $request->branch !== 'all') {
            $query->where('branch_id', $request->branch);
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        $jobs = $query->orderBy('created_at', 'desc')->paginate(12)->withQueryString();
            
        $branches = Branch::active()->get(['id', 'name']);

        return Inertia::render('Careers', [
            'jobs' => $jobs,
            'branches' => $branches,
            'filters' => $request->only(['search', 'branch', 'type']),
        ]);
    }

    public function apply(Request $request, NewsletterSubscriptionService $newsletterSubscriptionService)
    {
        $validated = $request->validate([
            'job_opening_id' => 'required|exists:job_openings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'cover_letter' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120',
            'newsletter_consent' => 'accepted',
        ]);

        $hasActiveApplication = JobApplication::query()
            ->where('job_opening_id', $validated['job_opening_id'])
            ->where('email', $validated['email'])
            ->whereIn('status', [
                JobApplicationStatus::Pending->value,
                JobApplicationStatus::Reviewing->value,
                JobApplicationStatus::Shortlisted->value,
            ])
            ->exists();

        if ($hasActiveApplication) {
            return back()->withErrors([
                'email' => 'You already have an active application for this position. Please wait for our update.',
            ])->withInput();
        }

        $cvPath = $request->file('cv')->store('cvs', 'public');

        JobApplication::create([
            'job_opening_id' => $validated['job_opening_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'cover_letter' => $validated['cover_letter'] ?? null,
            'cv_path' => $cvPath,
            'status' => 'pending',
        ]);

        $verificationRequested = $newsletterSubscriptionService->requestVerification(
            $validated['email'],
            $validated['name'],
        );

        return back()->with(
            'success',
            $verificationRequested
                ? 'Application submitted successfully! Please check your email to confirm newsletter subscription.'
                : 'Application submitted successfully!',
        );
    }
}
