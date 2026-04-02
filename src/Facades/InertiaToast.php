<?php

namespace LaravelInertiaToast\Facades;

use Illuminate\Support\Facades\Facade;

class InertiaToast extends Facade
{
    /**
     * @method static array flash()
     */
    protected static function getFacadeAccessor(): string
    {
        return 'inertia-toast';
    }
}
