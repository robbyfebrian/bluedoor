<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Generate policies + permissions first so role mapping can stay consistent.
        Artisan::call('shield:generate', [
            '--all' => true,
            '--panel' => 'admin',
            '--option' => 'policies_and_permissions',
            '--no-interaction' => true,
        ]);

        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
            CoffeeShopSeeder::class,
        ]);

        $this->command?->info(Artisan::output());
    }
}
