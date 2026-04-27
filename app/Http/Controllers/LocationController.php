<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function index(): Response
    {
        $branches = Branch::active()->get()->map(function ($branch) {
            return [
                'id' => $branch->id,
                'name' => $branch->name,
                'code' => $branch->code,
                'address' => $branch->address,
                'city' => $branch->city,
                'province' => $branch->province,
                'postal_code' => $branch->postal_code,
                'phone' => $branch->phone,
                'email' => $branch->email,
                'opening_time' => $branch->opening_time ? $branch->opening_time->format('H:i') : null,
                'closing_time' => $branch->closing_time ? $branch->closing_time->format('H:i') : null,
                'is_open' => $branch->isOpen(),
                'full_address' => $branch->full_address,
            ];
        });

        return Inertia::render('Locations', [
            'branches' => $branches,
        ]);
    }
}
