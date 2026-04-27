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
        
        $query = MenuItem::with('menuCategory')->available();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->category !== 'all') {
            // we assume menu_category_id is the foreign key, or if category filter uses category name/id? Let's use id.
            $query->where('menu_category_id', $request->category);
        }

        $menuItems = $query->orderBy('is_featured', 'desc')->paginate(12)->withQueryString();

        return Inertia::render('Menu', [
            'categories' => $categories,
            'menuItems' => $menuItems,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
