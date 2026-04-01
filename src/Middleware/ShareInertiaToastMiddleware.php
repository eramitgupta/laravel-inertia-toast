<?php

namespace LaravelInertiaToast\Middleware;

use Closure;
use Inertia\Inertia;

class ShareInertiaToastMiddleware
{
    public function handle($request, Closure $next)
    {
        Inertia::share([
            'toast' => function () use ($request) {
                if ($request->session()->has('toast')) {
                    return $request->session()->get('toast');
                }

                if ($request->session()->has('message')) {
                    return [
                        'type' => $request->session()->get('type', 'success'),
                        'title' => $request->session()->get('title'),
                        'message' => $request->session()->get('message'),
                        'duration' => $request->session()->get('duration', 3000),
                    ];
                }

                return [];
            },
        ]);

        return $next($request);
    }
}
