<?php

namespace LaravelInertiaToast;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use LaravelInertiaToast\Facades\InertiaToast;
use LaravelInertiaToast\Middleware\ShareInertiaToastMiddleware;
use LaravelInertiaToast\Support\InertiaToastLoader;

class InertiaToastServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('inertia-toast', function () {
            return new InertiaToastLoader;
        });
    }

    public function boot(): void
    {
        $this->loadHelpers();
        $this->registerAlias();
        $this->registerMiddleware();
    }

    protected function loadHelpers(): void
    {
        $helpers = __DIR__.'/LangHelpers.php';

        if (is_file($helpers)) {
            require_once $helpers;
        }
    }

    protected function registerAlias(): void
    {
        if (class_exists(AliasLoader::class)) {
            AliasLoader::getInstance()->alias('InertiaToast', InertiaToast::class);
        }
    }

    protected function registerMiddleware(): void
    {
        $router = $this->app['router'];
        $router->pushMiddlewareToGroup('web', ShareInertiaToastMiddleware::class);
    }
}
