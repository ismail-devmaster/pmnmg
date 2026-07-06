<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::latest()->paginate(10)->through(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'verified' => $user->email_verified_at !== null,
            'created_at' => $user->created_at->format('M d, Y'),
        ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function verifyEmail(Request $request, User $user): RedirectResponse
    {
        if ($user->email_verified_at !== null) {
            $user->email_verified_at = null;
            $user->save();

            return back()->with('flash', [
                'success' => "{$user->name}'s email has been marked as unverified.",
            ]);
        }

        $user->email_verified_at = now();
        $user->save();

        return back()->with('flash', [
            'success' => "{$user->name}'s email has been verified successfully.",
        ]);
    }

    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => 'required|string|in:admin,client',
        ]);

        if ($user->id === $request->user()->id) {
            return back()->withErrors(['role' => 'You cannot change your own role.']);
        }

        $oldRole = $user->role;
        $user->update(['role' => $validated['role']]);

        return back()->with('flash', [
            'success' => "{$user->name}'s role has been changed from {$oldRole} to {$validated['role']}.",
        ]);
    }
}
