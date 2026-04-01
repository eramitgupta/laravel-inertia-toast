<?php

namespace LaravelInertiaToast;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Foundation\Http\Kernel;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use LaravelInertiaToast\Facades\InertiaToast;
use LaravelInertiaToast\Middleware\ShareInertiaToastMiddleware;

class InertiaToastServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        $this->loadHelpers();
        $this->registerAlias();
        $this->registerMiddleware();
        $this->shareLangWithInertia();
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
        $this->app->make(Kernel::class)
            ->pushMiddleware(ShareInertiaToastMiddleware::class);
    }


    protected function shareLangWithInertia(): void
    {
        Inertia::share('lang', function () {
            return InertiaToast::flash();
        });
    }

}
