<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('/signup', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);
Route::post('/leads', [LeadController::class, 'store']);
Route::post('/followups', [FollowUpController::class, 'store']);
Route::put('/followups/{id}/status', [FollowUpController::class, 'updateStatus']);
Route::get('/alleads', [LeadController::class, 'index']);
Route::get('/followups/{leadId}', [FollowUpController::class, 'getFollowUpsByLead']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
