<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }

    public function updateRole(Request $request, User $user): JsonResponse|UserResource
    {
        $validated = $request->validate([
            'role' => 'required|string|in:admin,client',
        ]);

        if ($user->id === $request->user()->id) {
            throw ValidationException::withMessages([
                'role' => ['You cannot change your own role.'],
            ]);
        }

        $user->update(['role' => $validated['role']]);

        return new UserResource($user);
    }
}
