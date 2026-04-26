<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $team = Employee::with('branch')->active()->get();
        $branches = Branch::active()->get(['id', 'name']);

        return Inertia::render('Team', [
            'team' => $team,
            'branches' => $branches,
        ]);
    }
}
