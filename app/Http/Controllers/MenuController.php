<?php

namespace App\Http\Controllers;

use App\Models\MenuCategory;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $categories = MenuCategory::with(['menuItems' => function ($query) {
            $query->available()->ordered();
        }])
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('Menu', [
            'categories' => $categories,
        ]);
    }
}
