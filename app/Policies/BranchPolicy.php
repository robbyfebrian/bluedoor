<?php

namespace App\Policies;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BranchPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('view_any_branch');
    }

    public function view(User $user, Branch $branch): bool
    {
        return $user->can('view_branch');
    }

    public function create(User $user): bool
    {
        return $user->can('create_branch');
    }

    public function update(User $user, Branch $branch): bool
    {
        return $user->can('update_branch');
    }

    public function delete(User $user, Branch $branch): bool
    {
        return $user->can('delete_branch');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_branch');
    }

    public function restore(User $user, Branch $branch): bool
    {
        return $user->can('restore_branch');
    }

    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_branch');
    }

    public function replicate(User $user, Branch $branch): bool
    {
        return $user->can('replicate_branch');
    }

    public function forceDelete(User $user, Branch $branch): bool
    {
        return $user->can('force_delete_branch');
    }

    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_branch');
    }

    public function reorder(User $user): bool
    {
        return $user->can('reorder_branch');
    }
}
