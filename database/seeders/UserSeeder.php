<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sampleUsers = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'super_admin',
            ],
            [
                'name' => 'Manager',
                'email' => 'manager@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'manager_cabang',
            ],
            [
                'name' => 'Peninjau',
                'email' => 'peninjau@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'peninjau',
            ],
            [
                'name' => 'User',
                'email' => 'user@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'user',
            ],
        ];

        foreach ($sampleUsers as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            $user->syncRoles([$role]);
        }

        $this->command->info('Users seeded successfully.');
    }
}
