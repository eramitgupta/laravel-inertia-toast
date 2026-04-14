---
title: Installation Guide
description: Install Laravel Inertia Toast in a Laravel and Inertia app with Vue 3 or React, including backend package setup and frontend package registration.
keywords:
  - laravel inertia toast installation
  - install laravel toast package
  - inertia toast setup
  - vue toast installation
  - react toast installation
head:
  - - meta
    - name: description
      content: Install Laravel Inertia Toast in a Laravel and Inertia app with Vue 3 or React, including backend package setup and frontend package registration.
  - - meta
    - name: keywords
      content: laravel inertia toast installation, install laravel toast package, inertia toast setup, vue toast installation, react toast installation
---

# Installation

You need two packages:

- the Laravel package
- the frontend package for your framework

<div class="lit-grid lit-grid--compact">
  <div class="lit-card lit-card--backend-package">
    <h3>Backend Package</h3>
    <p>Handles the Laravel helper, facade, and shared Inertia toast data.</p>
  </div>
  <div class="lit-card lit-card--frontend-plugin">
    <h3>Frontend Plugin</h3>
    <p>Renders the toast UI and confirmation dialog in Vue or React.</p>
  </div>
  <div class="lit-card lit-card--simple-setup">
    <h3>Simple Setup</h3>
    <p>Laravel works automatically. On the frontend, you only need one setup step.</p>
  </div>
  <div class="lit-card lit-card--package-choice">
    <h3>Package</h3>
    <p>Use the React package in React apps and the Vue package in Vue apps.</p>
  </div>
</div>

## Requirements

- PHP `>= 8.1`
- Laravel `10`, `11`, `12`, or `13`
- `inertiajs/inertia-laravel` `^1.3`, `^2.0`, or `^3.0`
- Vue `3` with `@inertiajs/core` `^2.0` or `^3.0` and `@inertiajs/vue3` `^2.0` or `^3.0`
- React `18` or `19` with `@inertiajs/react` `^2.0` or `^3.0`

## 1. Install the Laravel package

```bash
composer require erag/laravel-inertia-toast
```

Laravel package discovery registers the service provider automatically.
You do not need to register any middleware manually.

## 2. Install the frontend package

Install the package for the frontend you use.

::: code-group

```bash [Vue]
npm install ./vendor/erag/laravel-inertia-toast/vue
```

```bash [React]
npm install ./vendor/erag/laravel-inertia-toast/react
```

:::

If you publish these packages to your own registry, install from there instead.

## 3. Register the frontend package

Add the frontend package in your Inertia bootstrap file, usually `resources/js/app.js` or `resources/js/app.ts`.

::: code-group

```ts [Vue]
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import ToastPlugin from '@erag/inertia-toast-vue';
import '@erag/inertia-toast-vue/style.css';

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

```tsx [React Provider]
import { createInertiaApp } from '@inertiajs/react';
import { InertiaToastProvider } from '@erag/inertia-toast-react';
import '@erag/inertia-toast-react/style.css';

createInertiaApp({
    withApp(app) {
        return (
            <InertiaToastProvider position="bottom-right">
                {app}
            </InertiaToastProvider>
        );
    },
});
```

```ts [React Initializer]
import initializeToast from '@erag/inertia-toast-react';
import '@erag/inertia-toast-react/style.css';

initializeToast({
    position: 'bottom-right',
});
```

:::

If you are using React, prefer the provider setup. Use the initializer only if you do not want to wrap the app tree.

## Verify the setup

If toasts are not showing, check these:

- the Vue plugin or React provider/initializer is registered
- the matching package stylesheet is imported
- the request ends with an Inertia response or redirect
- your app is bootstrapped through the standard Inertia entry file
