<?php

namespace App\Models;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    //
    protected $fillable = [
        'lead_id',
        'scheduled_at',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
    
}
