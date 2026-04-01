<?php

namespace LaravelInertiaToast\Support;

class InertiaToastLoader
{
    protected array $loaded = [];
    public function flash(): array
    {
        return $this->loaded;
    }
}
