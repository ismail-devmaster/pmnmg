<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    /**
     * Display a listing of all users (Admin Only).
     */
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }
}
