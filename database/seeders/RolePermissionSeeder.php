<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define the 4 core roles
        $roles = [
            'super_admin' => 'Super Administrator - Full system access',
            'manager' => 'Manager - Operational full access, publish content, hire candidates',
            'content_editor' => 'Content Editor - Create drafts for blog, gallery, reviews',
            'hr' => 'HR Specialist - Recruitment up to shortlist, employee management',
        ];

        // Create roles
        foreach ($roles as $name => $description) {
            Role::firstOrCreate(['name' => $name], ['guard_name' => 'web']);
        }

        // Get all permissions from Shield
        $allPermissions = Permission::all()->pluck('name')->toArray();

        // ============================
        // SUPER ADMIN - ALL PERMISSIONS
        // ============================
        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions($allPermissions);

        // ============================
        // MANAGER ROLE - Operational Full Access
        // ============================
        $manager = Role::findByName('manager');
        $managerPermissions = [
            // Blog Posts - Full CRUD + Publish
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
            'publish_blog_post', // Custom permission for publishing

            // Reviews - Full CRUD + Approve/Feature
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
            'approve_review', // Custom permission
            'feature_review', // Custom permission

            // Gallery Images - Full CRUD
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

            // Job Openings - Full CRUD
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

            // Job Applications - Full CRUD + Hire/Reject
            'view_any_job::application',
            'view_job::application',
            'create_job::application',
            'update_job::application',
            'delete_job::application',
            'delete_any_job::application',
            'restore_job::application',
            'restore_any_job::application',
            'force_delete_job::application',
            'force_delete_any_job::application',
            'replicate_job::application',
            'hire_candidate', // Custom permission - Manager decides hire/reject
            'reject_candidate', // Custom permission

            // Employees - Full CRUD
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

            // Menu Categories - Full CRUD
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

            // Menu Items - Full CRUD
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

            // Newsletter - Full CRUD + Broadcast
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
            'broadcast_newsletter', // Custom permission

            // Branches - Full CRUD
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
        $manager->syncPermissions(array_filter($managerPermissions, fn($p) => in_array($p, $allPermissions)));

        // ============================
        // CONTENT EDITOR ROLE - Create Drafts
        // ============================
        $contentEditor = Role::findByName('content_editor');
        $editorPermissions = [
            // Blog Posts - Create drafts, update own posts, view all
            'view_any_blog::post',
            'view_blog::post',
            'create_blog::post',
            'update_blog::post', // Can edit their own drafts
            'delete_blog::post', // Can delete their own drafts
            // NO publish_blog_post - Manager only

            // Gallery Images - Full CRUD
            'view_any_gallery::image',
            'view_gallery::image',
            'create_gallery::image',
            'update_gallery::image',
            'delete_gallery::image',

            // Reviews - View and moderate (but not feature)
            'view_any_review',
            'view_review',
            'update_review',
            'approve_review', // Can approve reviews
            // NO feature_review - Manager only

            // Menu - View only (for content planning)
            'view_any_menu::category',
            'view_menu::category',
            'view_any_menu::item',
            'view_menu::item',

            // Newsletter - View only
            'view_any_newsletter::subscription',
            'view_newsletter::subscription',

            // Branches - View only
            'view_any_branch',
            'view_branch',
        ];
        $contentEditor->syncPermissions(array_filter($editorPermissions, fn($p) => in_array($p, $allPermissions)));

        // ============================
        // HR ROLE - Recruitment + Employee Management
        // ============================
        $hr = Role::findByName('hr');
        $hrPermissions = [
            // Job Openings - Full CRUD
            'view_any_job::opening',
            'view_job::opening',
            'create_job::opening',
            'update_job::opening',
            'delete_job::opening',
            'restore_job::opening',

            // Job Applications - View and process up to shortlist
            'view_any_job::application',
            'view_job::application',
            'update_job::application', // Can change status: pending → reviewing → shortlisted
            'delete_job::application',
            // NO hire_candidate or reject_candidate - Manager only

            // Employees - Full CRUD
            'view_any_employee',
            'view_employee',
            'create_employee',
            'update_employee',
            'delete_employee',
            'restore_employee',

            // Branches - View only (need to know which branch to assign)
            'view_any_branch',
            'view_branch',

            // Menu - View only
            'view_any_menu::category',
            'view_menu::category',
            'view_any_menu::item',
            'view_menu::item',
        ];
        $hr->syncPermissions(array_filter($hrPermissions, fn($p) => in_array($p, $allPermissions)));

        // ============================
        // Assign Super Admin to User ID 1
        // ============================
        $adminUser = User::find(1);
        if ($adminUser) {
            $adminUser->assignRole('super_admin');
        }

        // ============================
        // Create Sample Users for Each Role
        // ============================
        $sampleUsers = [
            [
                'name' => 'Manager User',
                'email' => 'manager@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'manager',
            ],
            [
                'name' => 'Content Editor',
                'email' => 'editor@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'content_editor',
            ],
            [
                'name' => 'HR Specialist',
                'email' => 'hr@bluedoor.com',
                'password' => bcrypt('password'),
                'role' => 'hr',
            ],
        ];

        foreach ($sampleUsers as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
            $user->assignRole($role);
        }

        $this->command->info('✅ Roles and permissions seeded successfully!');
        $this->command->info('📝 4 roles created: super_admin, manager, content_editor, hr');
        $this->command->info('👥 Sample users created with credentials (password: password):');
        $this->command->info('   - admin@admin.com (super_admin)');
        $this->command->info('   - manager@bluedoor.com (manager)');
        $this->command->info('   - editor@bluedoor.com (content_editor)');
        $this->command->info('   - hr@bluedoor.com (hr)');
    }
}
