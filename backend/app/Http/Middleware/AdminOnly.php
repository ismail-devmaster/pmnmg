<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isAdmin()) {
            return redirect('/')->with('flash', [
                'success' => 'Your role has been updated. Welcome to your dashboard.',
            ]);
        }

        return $next($request);
    }
}
