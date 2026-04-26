<?php

namespace App\Http\Controllers;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(\Illuminate\Http\Request $request): Response
    {
        $categories = MenuCategory::active()->get();
        
        $menuItems = MenuItem::with('menuCategory')
            ->available()
            ->orderBy('is_featured', 'desc')
            ->get();

        return Inertia::render('Menu', [
            'categories' => $categories,
            'menuItems' => $menuItems,
            'filters' => $request->only(['category']),
        ]);
    }
}
