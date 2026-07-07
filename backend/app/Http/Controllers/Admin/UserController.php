<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UploadPhotoRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role = $request->get('role')) {
            $query->where('role', $role);
        }

        if ($status = $request->get('status')) {
            match ($status) {
                'active' => $query->where('is_active', true),
                'inactive' => $query->where('is_active', false),
                'verified' => $query->whereNotNull('email_verified_at'),
                'unverified' => $query->whereNull('email_verified_at'),
                default => null,
            };
        }

        $sortField = $request->get('sort', 'created_at');
        $sortDir = $request->get('dir', 'desc');
        $allowedSorts = ['name', 'email', 'role', 'is_active', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDir === 'asc' ? 'asc' : 'desc');
        }

        $perPage = min((int) $request->get('per_page', 10), 50);

        $users = $query->paginate($perPage)->through(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'verified' => $user->email_verified_at !== null,
            'is_active' => $user->is_active,
            'profile_photo_url' => $user->profile_photo_url,
            'created_at' => $user->created_at->format('M d, Y'),
        ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status', 'sort', 'dir', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role ?? 'client',
        ]);

        return redirect()->route('admin.users.index')
            ->with('flash', ['success' => 'User created successfully.']);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'profile_picture' => $user->profile_picture,
                'profile_photo_url' => $user->profile_photo_url,
            ],
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('admin.users.index')
            ->with('flash', ['success' => 'User updated successfully.']);
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['delete' => 'You cannot delete your own account.']);
        }

        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('flash', ['success' => 'User deleted successfully.']);
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

    public function toggleActive(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['activate' => 'You cannot change your own active status.']);
        }

        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activated' : 'deactivated';

        return back()->with('flash', [
            'success' => "{$user->name} has been {$status} successfully.",
        ]);
    }

    public function uploadPhoto(UploadPhotoRequest $request, User $user): RedirectResponse
    {
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $path = $request->file('photo')->store('profile-pictures', 'public');

        $user->update(['profile_picture' => $path]);

        return back()->with('flash', [
            'success' => 'Profile picture updated successfully.',
        ]);
    }

    public function removePhoto(Request $request, User $user): RedirectResponse
    {
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
            $user->update(['profile_picture' => null]);
        }

        return back()->with('flash', [
            'success' => 'Profile picture removed successfully.',
        ]);
    }
}
