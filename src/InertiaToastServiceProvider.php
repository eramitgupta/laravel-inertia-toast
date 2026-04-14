<?php

namespace LaravelInertiaToast;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Contracts\Http\Kernel as HttpKernel;
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

    /**
     * @throws BindingResolutionException
     */
    protected function registerMiddleware(): void
    {
        $kernel = $this->app->make(HttpKernel::class);
        $kernel->pushMiddleware(ShareInertiaToastMiddleware::class);
    }
}
