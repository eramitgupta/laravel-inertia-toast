<?php

namespace LaravelInertiaToast\Support;

class InertiaToastLoader
{
    public function flash(): array
    {
        return [
            'type' => session('type'),
            'title' => session('title'),
            'message' => session('message'),
            'duration' => session('duration', 3000),
        ];
    }
}
