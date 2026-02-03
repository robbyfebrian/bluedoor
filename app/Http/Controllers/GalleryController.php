<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category');

        $query = GalleryImage::active()->ordered();

        if ($category) {
            $query->category($category);
        }

        $images = $query->get();

        $categories = [
            'all' => 'All Photos',
            'coffee' => 'Coffee',
            'food' => 'Food',
            'ambiance' => 'Ambiance',
            'events' => 'Events',
        ];

        return inertia('Gallery', [
            'images' => $images,
            'categories' => $categories,
            'selectedCategory' => $category ?? 'all',
        ]);
    }
}
