<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Employee;
use App\Models\JobOpening;
use Illuminate\Database\Seeder;

class CoffeeShopSeeder extends Seeder
{
    public function run(): void
    {
        // Menu Categories
        $espresso = MenuCategory::create([
            'name' => 'Espresso Drinks',
            'slug' => 'espresso-drinks',
            'description' => 'Classic espresso-based beverages',
            'order' => 1,
            'is_active' => true,
        ]);

        $brew = MenuCategory::create([
            'name' => 'Brewed Coffee',
            'slug' => 'brewed-coffee',
            'description' => 'Fresh brewed coffee selections',
            'order' => 2,
            'is_active' => true,
        ]);

        $pastries = MenuCategory::create([
            'name' => 'Pastries',
            'slug' => 'pastries',
            'description' => 'Freshly baked goods',
            'order' => 3,
            'is_active' => true,
        ]);

        // Menu Items - Espresso
        MenuItem::create([
            'menu_category_id' => $espresso->id,
            'name' => 'Cappuccino',
            'slug' => 'cappuccino',
            'description' => 'Equal parts espresso, steamed milk, and milk foam',
            'price' => 4.50,
            'is_available' => true,
            'is_featured' => true,
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_category_id' => $espresso->id,
            'name' => 'Latte',
            'slug' => 'latte',
            'description' => 'Espresso with steamed milk and light foam',
            'price' => 4.75,
            'is_available' => true,
            'is_featured' => true,
            'order' => 2,
        ]);

        MenuItem::create([
            'menu_category_id' => $espresso->id,
            'name' => 'Americano',
            'slug' => 'americano',
            'description' => 'Espresso shots with hot water',
            'price' => 3.50,
            'is_available' => true,
            'order' => 3,
        ]);

        // Menu Items - Brewed Coffee
        MenuItem::create([
            'menu_category_id' => $brew->id,
            'name' => 'House Blend',
            'slug' => 'house-blend',
            'description' => 'Our signature medium roast blend',
            'price' => 2.50,
            'is_available' => true,
            'is_featured' => true,
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_category_id' => $brew->id,
            'name' => 'Cold Brew',
            'slug' => 'cold-brew',
            'description' => 'Smooth, refreshing cold-steeped coffee',
            'price' => 4.00,
            'is_available' => true,
            'is_featured' => true,
            'order' => 2,
        ]);

        // Menu Items - Pastries
        MenuItem::create([
            'menu_category_id' => $pastries->id,
            'name' => 'Croissant',
            'slug' => 'croissant',
            'description' => 'Buttery, flaky French pastry',
            'price' => 3.00,
            'allergens' => ['gluten', 'dairy'],
            'is_available' => true,
            'is_featured' => true,
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_category_id' => $pastries->id,
            'name' => 'Blueberry Muffin',
            'slug' => 'blueberry-muffin',
            'description' => 'Fresh baked muffin with wild blueberries',
            'price' => 3.50,
            'allergens' => ['gluten', 'eggs'],
            'is_available' => true,
            'is_featured' => true,
            'order' => 2,
        ]);

        // Employees
        Employee::create([
            'name' => 'Sarah Johnson',
            'position' => 'Owner & Head Barista',
            'bio' => 'Sarah founded Blue Door Coffee in 2020 with a passion for creating community through exceptional coffee.',
            'order' => 1,
            'is_active' => true,
        ]);

        Employee::create([
            'name' => 'Michael Chen',
            'position' => 'Lead Barista',
            'bio' => 'Michael brings 8 years of coffee expertise and championship latte art skills to our team.',
            'order' => 2,
            'is_active' => true,
        ]);

        Employee::create([
            'name' => 'Emily Rodriguez',
            'position' => 'Pastry Chef',
            'bio' => 'Emily creates all our delicious baked goods fresh every morning using locally sourced ingredients.',
            'order' => 3,
            'is_active' => true,
        ]);

        Employee::create([
            'name' => 'David Kim',
            'position' => 'Barista',
            'bio' => 'David is passionate about coffee education and loves sharing brewing techniques with customers.',
            'order' => 4,
            'is_active' => true,
        ]);

        // Job Openings
        JobOpening::create([
            'title' => 'Barista',
            'slug' => 'barista',
            'description' => '<p>We are looking for an enthusiastic barista to join our team!</p><p>As a barista at Blue Door Coffee, you\'ll craft exceptional beverages, create memorable customer experiences, and be part of a supportive team.</p>',
            'type' => 'full-time',
            'location' => 'Brewtown',
            'requirements' => '<ul><li>Previous barista or customer service experience preferred</li><li>Passion for coffee and hospitality</li><li>Ability to work flexible hours including weekends</li><li>Strong communication skills</li></ul>',
            'responsibilities' => '<ul><li>Prepare espresso drinks and brewed coffee</li><li>Provide excellent customer service</li><li>Maintain cleanliness and organization</li><li>Learn and apply latte art techniques</li></ul>',
            'salary_min' => 15.00,
            'salary_max' => 18.00,
            'is_active' => true,
        ]);

        JobOpening::create([
            'title' => 'Assistant Pastry Chef',
            'slug' => 'assistant-pastry-chef',
            'description' => '<p>Join our baking team as an Assistant Pastry Chef!</p><p>You\'ll work alongside our head pastry chef to create delicious baked goods for our customers.</p>',
            'type' => 'part-time',
            'location' => 'Brewtown',
            'requirements' => '<ul><li>Culinary school experience or equivalent work experience</li><li>Knowledge of baking techniques</li><li>Early morning availability (4am start)</li><li>Food handler\'s certification</li></ul>',
            'responsibilities' => '<ul><li>Assist with daily baking production</li><li>Prepare pastries, muffins, and other baked goods</li><li>Maintain kitchen cleanliness and food safety standards</li><li>Help with recipe development</li></ul>',
            'salary_min' => 16.00,
            'salary_max' => 20.00,
            'is_active' => true,
        ]);

        JobOpening::create([
            'title' => 'Shift Supervisor',
            'slug' => 'shift-supervisor',
            'description' => '<p>We\'re seeking an experienced shift supervisor to lead our team!</p><p>This role involves overseeing daily operations, managing staff, and ensuring excellent customer service.</p>',
            'type' => 'full-time',
            'location' => 'Brewtown',
            'requirements' => '<ul><li>2+ years of supervisory experience in food service</li><li>Strong leadership and communication skills</li><li>Ability to handle cash and financial transactions</li><li>Flexible schedule availability</li></ul>',
            'responsibilities' => '<ul><li>Manage shift operations and staff scheduling</li><li>Train and develop team members</li><li>Handle customer concerns and issues</li><li>Oversee cash handling and daily reports</li><li>Maintain quality and safety standards</li></ul>',
            'salary_min' => 45000,
            'salary_max' => 55000,
            'is_active' => true,
        ]);

        $this->command->info('Coffee shop sample data created successfully!');
    }
}
