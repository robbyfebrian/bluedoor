<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $team = Employee::active()
            ->ordered()
            ->get();

        return Inertia::render('Team', [
            'team' => $team,
        ]);
    }
}
