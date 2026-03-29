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
            'admin',
            'manager_cabang',
            'peninjau',
        ];

        foreach ($roles as $name) {
            Role::firstOrCreate(['name' => $name], ['guard_name' => 'web']);
        }

        $allPermissions = Permission::all()->pluck('name')->toArray();

        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions($allPermissions);

        $admin = Role::findByName('admin');
        $adminPermissions = [
            'view_any_blog::post',
            'view_blog::post',
            'create_blog::post',
            'update_blog::post',
            'delete_blog::post',
            'delete_any_blog::post',
            'restore_blog::post',
            'restore_any_blog::post',
            'force_delete_blog::post',
            'force_delete_any_blog::post',
            'replicate_blog::post',
            'publish_blog_post',

            'view_any_review',
            'view_review',
            'create_review',
            'update_review',
            'delete_review',
            'delete_any_review',
            'restore_review',
            'restore_any_review',
            'force_delete_review',
            'force_delete_any_review',
            'replicate_review',
            'approve_review',
            'feature_review',

            'view_any_gallery::image',
            'view_gallery::image',
            'create_gallery::image',
            'update_gallery::image',
            'delete_gallery::image',
            'delete_any_gallery::image',
            'restore_gallery::image',
            'restore_any_gallery::image',
            'force_delete_gallery::image',
            'force_delete_any_gallery::image',
            'replicate_gallery::image',

            'view_any_job::opening',
            'view_job::opening',
            'create_job::opening',
            'update_job::opening',
            'delete_job::opening',
            'delete_any_job::opening',
            'restore_job::opening',
            'restore_any_job::opening',
            'force_delete_job::opening',
            'force_delete_any_job::opening',
            'replicate_job::opening',

            'view_any_job::application',
            'view_job::application',
            'update_job::application',
            'delete_job::application',
            'delete_any_job::application',
            'restore_job::application',
            'restore_any_job::application',
            'force_delete_job::application',
            'force_delete_any_job::application',
            'replicate_job::application',
            'hire_candidate',
            'reject_candidate',

            'view_any_employee',
            'view_employee',
            'create_employee',
            'update_employee',
            'delete_employee',
            'delete_any_employee',
            'restore_employee',
            'restore_any_employee',
            'force_delete_employee',
            'force_delete_any_employee',
            'replicate_employee',

            'view_any_menu::category',
            'view_menu::category',
            'create_menu::category',
            'update_menu::category',
            'delete_menu::category',
            'delete_any_menu::category',
            'restore_menu::category',
            'restore_any_menu::category',
            'force_delete_menu::category',
            'force_delete_any_menu::category',
            'replicate_menu::category',
            'view_any_menu::item',
            'view_menu::item',
            'create_menu::item',
            'update_menu::item',
            'delete_menu::item',
            'delete_any_menu::item',
            'restore_menu::item',
            'restore_any_menu::item',
            'force_delete_menu::item',
            'force_delete_any_menu::item',
            'replicate_menu::item',

            'view_any_newsletter::subscription',
            'view_newsletter::subscription',
            'create_newsletter::subscription',
            'update_newsletter::subscription',
            'delete_newsletter::subscription',
            'delete_any_newsletter::subscription',
            'restore_newsletter::subscription',
            'restore_any_newsletter::subscription',
            'force_delete_newsletter::subscription',
            'force_delete_any_newsletter::subscription',
            'replicate_newsletter::subscription',
            'broadcast_newsletter',

            'view_any_branch',
            'view_branch',
            'create_branch',
            'update_branch',
            'delete_branch',
            'delete_any_branch',
            'restore_branch',
            'restore_any_branch',
            'force_delete_branch',
            'force_delete_any_branch',
            'replicate_branch',
        ];
        $admin->syncPermissions(array_values(array_intersect($adminPermissions, $allPermissions)));

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
