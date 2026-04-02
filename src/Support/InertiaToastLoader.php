<?php

namespace LaravelInertiaToast\Support;

class InertiaToastLoader
{
    public function flash(): array
    {
        if (session()->has('toast')) {
            return session('toast');
        }

        if (session()->has('message')) {
            $type = session('type', 'success');

            return [
                'id' => uniqid(),
                'type' => $type,
                'title' => session('title') ?? ucfirst($type),
                'message' => session('message'),
                'duration' => session('duration', 3000),
            ];
        }

        return [];
    }
}
