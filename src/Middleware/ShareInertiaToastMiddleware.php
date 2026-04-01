<?php

namespace LaravelInertiaToast\Middleware;

use Closure;
use Inertia\Inertia;
use LaravelInertiaToast\Facades\InertiaToast;

class ShareInertiaToastMiddleware
{
    public function handle($request, Closure $next)
    {
        $translations = InertiaToast::flash();

        if (! empty($translations)) {
            Inertia::share([
                'lang' => $translations,
            ]);
        }

        return $next($request);
    }
}
