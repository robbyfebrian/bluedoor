<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Employee::with('branch')->active();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
            });
        }

        if ($request->filled('branch') && $request->branch !== 'all') {
            $query->where('branch_id', $request->branch);
        }

        $team = $query->paginate(12)->withQueryString();
        $branches = Branch::active()->get(['id', 'name']);

        return Inertia::render('Team', [
            'team' => $team,
            'branches' => $branches,
            'filters' => $request->only(['search', 'branch']),
        ]);
    }
}
