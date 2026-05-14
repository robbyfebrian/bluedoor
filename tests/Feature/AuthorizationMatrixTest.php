<?php

use App\Models\BlogPost;
use App\Models\JobApplication;
use App\Models\NewsletterSubscription;
use App\Models\Review;
use App\Models\User;
use App\Policies\BlogPostPolicy;
use App\Policies\JobApplicationPolicy;
use App\Policies\NewsletterSubscriptionPolicy;
use App\Policies\ReviewPolicy;
use Database\Seeders\RolePermissionSeeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

it('assigns expected permissions to manager and peninjau roles', function () {
    $permissions = [
        'ViewAny:JobOpening', 'Create:JobOpening',
        'ViewAny:Employee', 'Create:Employee',
        'ViewAny:MenuCategory', 'ViewAny:MenuItem',
        'ViewAny:Branch',
        'ViewAny:JobApplication', 'View:JobApplication', 'Update:JobApplication',
        'review_job_application', 'shortlist_job_application', 'hire_candidate', 'reject_candidate',
        'publish_blog_post', 'approve_review', 'feature_review',
        'ViewAny:NewsletterSubscription', 'broadcast_newsletter',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
    }

    app(RolePermissionSeeder::class)->run();

    $manager = Role::findByName('manager_cabang');
    $peninjau = Role::findByName('peninjau');

    expect($manager->hasPermissionTo('ViewAny:JobOpening'))->toBeTrue();
    expect($manager->hasPermissionTo('publish_blog_post'))->toBeTrue();
    expect($manager->hasPermissionTo('review_job_application'))->toBeTrue();
    expect($manager->hasPermissionTo('hire_candidate'))->toBeTrue();
    expect($peninjau->hasPermissionTo('review_job_application'))->toBeTrue();
    expect($peninjau->hasPermissionTo('hire_candidate'))->toBeTrue();
});

it('allows custom policy actions when permission is granted', function () {
    $user = User::factory()->create();
    Permission::firstOrCreate(['name' => 'publish_blog_post', 'guard_name' => 'web']);
    Permission::firstOrCreate(['name' => 'approve_review', 'guard_name' => 'web']);
    Permission::firstOrCreate(['name' => 'broadcast_newsletter', 'guard_name' => 'web']);
    Permission::firstOrCreate(['name' => 'review_job_application', 'guard_name' => 'web']);

    $user->givePermissionTo([
        'publish_blog_post',
        'approve_review',
        'broadcast_newsletter',
        'review_job_application',
    ]);

    $blogPost = new BlogPost();
    $review = new Review();
    $jobApplication = new JobApplication();

    expect((new BlogPostPolicy())->publish($user, $blogPost))->toBeTrue();
    expect((new ReviewPolicy())->approve($user, $review))->toBeTrue();
    expect((new NewsletterSubscriptionPolicy())->broadcast($user))->toBeTrue();
    expect((new JobApplicationPolicy())->review($user, $jobApplication))->toBeTrue();
});
