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
                'flash' => [
                    'type' => $request->session()->get('type'),
                    'title' => $request->session()->get('title'),
                    'message' => $request->session()->get('message'),
                    'duration' => $request->session()->get('duration', 3000),
                ],
            ]);
        }

        return $next($request);
    }
}
