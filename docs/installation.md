# Installation

This package has two parts:

- a Laravel package for flashing and sharing toast data
- a Vue package for rendering notifications and confirmation dialogs

<div class="lit-grid lit-grid--compact">
  <div class="lit-card lit-card--package">
    <h3>Backend Package</h3>
    <p>Registers the helper, facade, and middleware integration in Laravel.</p>
  </div>
  <div class="lit-card lit-card--plugin">
    <h3>Frontend Plugin</h3>
    <p>Mounts toast and confirmation UI once in your Vue 3 Inertia bootstrap.</p>
  </div>
  <div class="lit-card lit-card--setup">
    <h3>Low Setup Cost</h3>
    <p>No manual provider wiring in a normal Laravel app and only one plugin registration on the frontend.</p>
  </div>
  <div class="lit-card lit-card--react">
    <h3>React Support</h3>
    <p>Coming soon. Install Vue 3 for now if you want to use the current frontend package.</p>
  </div>
</div>

## Setup level

This is a low-config integration:

- Laravel auto-discovers the service provider
- middleware is pushed into the `web` group automatically
- the Vue side needs one plugin registration and one CSS import

It is not a zero-dependency package, because it builds on Laravel, Inertia, and Vue.

## Requirements

- PHP `>= 8.1`
- Laravel `10`, `11`, `12`, or `13`
- `inertiajs/inertia-laravel` `^1.3`, `^2.0`, or `^3.0`
- Vue `3`
- `@inertiajs/core` `^2.0` or `^3.0`
- `@inertiajs/vue3` `^2.0` or `^3.0`

## 1. Install the Laravel package

```bash
composer require erag/laravel-inertia-toast
```

Laravel package discovery registers the service provider automatically.

## 2. Install the Vue package

If you are consuming the frontend package from the Composer-installed vendor directory:

```bash
npm install ./vendor/erag/laravel-inertia-toast/vue
```

If you publish the Vue package separately to your own registry, install it from there instead.

## 3. Register the Vue plugin

Add the plugin in your Inertia app bootstrap, usually `resources/js/app.js` or `resources/js/app.ts`.

```ts
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import ToastPlugin from '@erag/inertia-toast';
import '@erag/inertia-toast/dist/style.css';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ToastPlugin, {
                position: 'bottom-right',
            })
            .mount(el);
    },
});
```

## 4. Trigger your first toast

```php
public function store()
{
    toast('Post created successfully', 'success', 'Saved');

    return redirect()->route('posts.index');
}
```

After the redirect, the toast is rendered automatically.

## What the package registers

On the Laravel side:

- the global `toast()` helper
- the `InertiaToast` alias and facade
- `ShareInertiaToastMiddleware` inside the `web` middleware group

On the Vue side:

- a toast container
- a confirmation modal container
- an Inertia flash bridge that reads `props.toast`

## Verify the setup

Use this checklist if the first toast does not appear:

- the Vue plugin is registered with `.use(ToastPlugin)`
- the package stylesheet is imported
- the request ends with an Inertia response or redirect
- your app is bootstrapped through the standard Inertia entry file
