<?php

namespace LaravelInertiaToast\Middleware;

use Closure;
use Inertia\Inertia;
use LaravelInertiaToast\Facades\InertiaToast;

class ShareInertiaToastMiddleware
{
    public function handle($request, Closure $next)
    {
        Inertia::share([
            'toast' => fn () => InertiaToast::flash(),
        ]);

        return $next($request);
    }
}
