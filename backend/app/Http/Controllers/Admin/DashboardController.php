<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_products' => Product::count(),
                'total_users' => User::count(),
                'total_admins' => User::where('role', 'admin')->count(),
                'total_clients' => User::where('role', 'client')->count(),
            ],
            'recent_products' => Product::latest()->take(5)->get()->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'created_at' => $product->created_at->format('M d, Y'),
            ]),
        ]);
    }
}
