<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $roles = [
            'super_admin',
            'manager_cabang',
            'peninjau',
            'user'
        ];

        foreach ($roles as $name) {
            Role::firstOrCreate(['name' => $name], ['guard_name' => 'web']);
        }

        $allPermissions = Permission::all()->pluck('name')->toArray();

        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions($allPermissions);

        $managerCabang = Role::findByName('manager_cabang');
        $managerCabangPermissions = [
            'view_any_job::opening',
            'view_job::opening',
            'create_job::opening',
            'update_job::opening',
            'delete_job::opening',
            'restore_job::opening',

            'view_any_employee',
            'view_employee',
            'create_employee',
            'update_employee',
            'delete_employee',
            'restore_employee',

            'view_any_menu::category',
            'view_menu::category',
            'create_menu::category',
            'update_menu::category',
            'delete_menu::category',
            'view_any_menu::item',
            'view_menu::item',
            'create_menu::item',
            'update_menu::item',
            'delete_menu::item',

            'view_any_branch',
            'view_branch',
        ];
        $managerCabang->syncPermissions(array_values(array_intersect($managerCabangPermissions, $allPermissions)));

        $peninjau = Role::findByName('peninjau');
        $peninjauPermissions = [
            'view_any_job::application',
            'view_job::application',
            'update_job::application',
        ];
        $peninjau->syncPermissions(array_values(array_intersect($peninjauPermissions, $allPermissions)));

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
