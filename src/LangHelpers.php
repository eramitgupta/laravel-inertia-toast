<?php

if (! function_exists('toast')) {
    function toast(
        string $message,
        string $type = 'success',
        ?string $title = null,
        int $duration = 3000,
        ?string $position = null
    ): void {
        session()->flash('toast', [
            'id' => uniqid(),
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'duration' => $duration,
            'position' => $position,
        ]);
    }
}
