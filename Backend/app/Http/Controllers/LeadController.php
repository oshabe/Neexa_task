<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    //

    public function index()
    {
        $leads = Lead::all();
        
        return response()->json($leads);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:leads,email',
            'phone' => 'required|string|max:15',
        ]);

        // Create a new lead record
        $lead = Lead::create($request->only(['name', 'email', 'phone']));

        // Return the created lead
        return response()->json($lead, 201);
    }
}
