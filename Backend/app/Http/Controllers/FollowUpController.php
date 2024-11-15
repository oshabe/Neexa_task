<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use Illuminate\Http\Request;
use App\Events\FollowUpStatusChanged;
use App\Notifications\FollowUpMissedNotification;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FollowUpController extends Controller
{
    //
    use AuthorizesRequests;

    public function getFollowUpsByLead($leadId)
    {
        $followUps = FollowUp::where('lead_id', $leadId)->get();
        return response()->json($followUps);
    }
    
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'scheduled_at' => 'required|date|after:now',
            'status' => 'required|in:Pending,Completed,Missed',
        ]);

        // Create a new follow-up
        $followUp = FollowUp::create($request->only(['lead_id', 'scheduled_at', 'status']));

        // Return the created follow-up
        return response()->json($followUp, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $followUp = FollowUp::findOrFail($id);

        // Check if the user can update the follow-up
        //$this->authorize('update', $followUp);

        // Validate the incoming request data
        $request->validate([
            'status' => 'required|in:Pending,Completed,Missed',
        ]);

        // Update the status
        $followUp->status = $request->status;
        $followUp->save();

        // Dispatch the FollowUpStatusChanged event
        // FollowUpStatusChanged::dispatch($followUp);

        // // Send notification if status is "Missed"
        // if ($followUp->status === 'Missed') {
        //     $userToNotify = $followUp->user; 
        //     $userToNotify->notify(new FollowUpMissedNotification($followUp));
        // }

        // Return the updated follow-up
        return response()->json($followUp, 200);
    }

}
