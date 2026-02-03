<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category');

        $query = BlogPost::published()
            ->with('author')
            ->orderBy('published_at', 'desc');

        if ($category) {
            $query->category($category);
        }

        $posts = $query->paginate(12);

        $categories = [
            'all' => 'All Posts',
            'news' => 'News',
            'recipes' => 'Recipes',
            'coffee_tips' => 'Coffee Tips',
            'events' => 'Events',
            'behind_the_scenes' => 'Behind the Scenes',
        ];

        return inertia('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedCategory' => $category ?? 'all',
        ]);
    }

    public function show(string $slug)
    {
        $post = BlogPost::published()
            ->with('author')
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $post->incrementViews();

        // Get related posts (same category, exclude current)
        $relatedPosts = BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where('category', $post->category)
            ->take(3)
            ->get();

        return inertia('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
