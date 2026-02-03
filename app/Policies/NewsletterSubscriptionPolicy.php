<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\NewsletterSubscription;
use Illuminate\Auth\Access\HandlesAuthorization;

class NewsletterSubscriptionPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:NewsletterSubscription');
    }

    public function view(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('View:NewsletterSubscription');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:NewsletterSubscription');
    }

    public function update(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('Update:NewsletterSubscription');
    }

    public function delete(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('Delete:NewsletterSubscription');
    }

    public function restore(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('Restore:NewsletterSubscription');
    }

    public function forceDelete(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('ForceDelete:NewsletterSubscription');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:NewsletterSubscription');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:NewsletterSubscription');
    }

    public function replicate(AuthUser $authUser, NewsletterSubscription $newsletterSubscription): bool
    {
        return $authUser->can('Replicate:NewsletterSubscription');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:NewsletterSubscription');
    }

}