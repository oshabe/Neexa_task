<?php

namespace App\Policies;

use App\Models\User;
use App\Models\FollowUp;

class FollowUpPolicy
{
    /**
     * Create a new policy instance.
     */
    public function update(User $user, FollowUp $followUp)
    {
        // Check if the user is an Admin or Sales Manager
        return in_array($user->role, ['Admin', 'Sales Manager']);
    }
    
    public function __construct()
    {
        //
    }
}
