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

        $allPermissions = Permission::query()->pluck('name')->toArray();
        $hasPermission = static fn (string $permission): bool => in_array($permission, $allPermissions, true);

        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions($allPermissions);

        $managerCabang = Role::findByName('manager_cabang');
        $managerCabangPermissions = [
            'ViewAny:JobOpening',
            'View:JobOpening',
            'Create:JobOpening',
            'Update:JobOpening',
            'Delete:JobOpening',

            'ViewAny:Employee',
            'View:Employee',
            'Create:Employee',
            'Update:Employee',
            'Delete:Employee',

            'ViewAny:MenuCategory',
            'View:MenuCategory',
            'Create:MenuCategory',
            'Update:MenuCategory',
            'Delete:MenuCategory',
            'ViewAny:MenuItem',
            'View:MenuItem',
            'Create:MenuItem',
            'Update:MenuItem',
            'Delete:MenuItem',

            'ViewAny:Branch',
            'View:Branch',

            'ViewAny:BlogPost',
            'View:BlogPost',
            'Create:BlogPost',
            'Update:BlogPost',
            'publish_blog_post',

            'ViewAny:Review',
            'View:Review',
            'Update:Review',
            'approve_review',
            'feature_review',

            'ViewAny:GalleryImage',
            'View:GalleryImage',
            'Create:GalleryImage',
            'Update:GalleryImage',
            'Delete:GalleryImage',

            'ViewAny:NewsletterSubscription',
            'View:NewsletterSubscription',
            'broadcast_newsletter',

            'ViewAny:JobApplication',
            'View:JobApplication',
            'Update:JobApplication',
            'review_job_application',
            'shortlist_job_application',
            'hire_candidate',
            'reject_candidate',
        ];
        $managerCabang->syncPermissions(array_values(array_filter(
            $managerCabangPermissions,
            $hasPermission,
        )));

        $peninjau = Role::findByName('peninjau');
        $peninjauPermissions = [
            'ViewAny:JobApplication',
            'View:JobApplication',
            'Update:JobApplication',
            'review_job_application',
            'shortlist_job_application',
            'hire_candidate',
            'reject_candidate',
        ];
        $peninjau->syncPermissions(array_values(array_filter(
            $peninjauPermissions,
            $hasPermission,
        )));

        $this->command?->info('Roles and permissions seeded successfully.');
    }
}
