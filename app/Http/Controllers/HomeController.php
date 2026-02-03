<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Employee;
use App\Models\JobOpening;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredItems = MenuItem::with('menuCategory')
            ->featured()
            ->available()
            ->ordered()
            ->limit(6)
            ->get();

        $teamMembers = Employee::active()
            ->ordered()
            ->limit(4)
            ->get();

        $openPositions = JobOpening::active()
            ->limit(3)
            ->get();

        return Inertia::render('Home', [
            'featuredItems' => $featuredItems,
            'teamMembers' => $teamMembers,
            'openPositions' => $openPositions,
        ]);
    }
}
