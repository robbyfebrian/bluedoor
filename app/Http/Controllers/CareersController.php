<?php

namespace App\Http\Controllers;

use App\Enums\JobApplicationStatus;
use App\Models\JobOpening;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CareersController extends Controller
{
    public function index(): Response
    {
        $jobs = JobOpening::active()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Careers', [
            'jobs' => $jobs,
        ]);
    }

    public function apply(Request $request)
    {
        $validated = $request->validate([
            'job_opening_id' => 'required|exists:job_openings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'cover_letter' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120',
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

        return back()->with('success', 'Application submitted successfully!');
    }
}
