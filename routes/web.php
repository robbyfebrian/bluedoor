<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

// Public landing page routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/menu', [MenuController::class, 'index'])->name('menu');
Route::get('/team', [TeamController::class, 'index'])->name('team');
Route::get('/careers', [CareersController::class, 'index'])->name('careers');

// New feature routes
Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Form submission routes
Route::post('/careers/apply', [CareersController::class, 'apply'])->name('careers.apply');
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::post('/reviews/submit', [ReviewController::class, 'store'])->name('reviews.submit');
