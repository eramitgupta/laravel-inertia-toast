---
layout: home

hero:
  name: "Laravel Inertia Toast"
  text: "Notifications and confirmation dialogs for Laravel + Inertia + Vue 3"
  tagline: "A low-config package that flashes toast data from Laravel and renders it automatically in your Inertia frontend."
  actions:
    - theme: brand
      text: Get Started
      link: /installation
    - theme: alt
      text: Vue Usage
      link: /vue

features:
  - title: Laravel-first API
    details: Use the global `toast()` helper or the `InertiaToast` facade and let the package handle session flashing and Inertia sharing.
  - title: Low-config setup
    details: Laravel auto-discovers the service provider, pushes middleware to the `web` group, and the Vue plugin only needs one registration line in your Inertia bootstrap.
  - title: Vue 3 frontend plugin
    details: Register the plugin once to mount the toast container, confirmation modal, and Inertia flash bridge automatically.
  - title: Practical defaults
    details: Supports six positions, common toast types, standard Laravel flash keys, and promise-based confirmations.
---

## Why this package

`Laravel Inertia Toast` connects Laravel flash messages to an Inertia-powered Vue 3 UI without extra wiring in every page.

It is built for apps that want:

- a simple backend helper for redirect-based notifications
- a Vue composable for client-side toasts
- a reusable confirmation modal for destructive actions
- automatic sharing through the Laravel `web` middleware group
- minimal app-level configuration

<div class="lit-grid">
  <div class="lit-card lit-card--helper">
    <h3>Laravel Helper</h3>
    <p>Flash toast payloads from controllers with a single <code>toast()</code> call.</p>
  </div>
  <div class="lit-card lit-card--bridge">
    <h3>Inertia Bridge</h3>
    <p>Share toast data automatically through the <code>web</code> middleware group and render it on visits.</p>
  </div>
  <div class="lit-card lit-card--typescript">
    <h3>Typed Frontend API</h3>
    <p>Use typed plugin options, positions, modal options, and composables in Vue 3 projects.</p>
  </div>
  <div class="lit-card lit-card--confirm">
    <h3>Confirmation Modal</h3>
    <p>Handle delete and danger flows with a promise-based confirm dialog that fits Inertia actions.</p>
  </div>
</div>

## Key features

- `toast()` helper for Laravel redirects and post-action feedback
- `InertiaToast::flash()` facade access when you want to inspect the resolved payload
- automatic Inertia prop sharing through package middleware
- one-time Vue plugin registration for toast UI and confirmation modal
- support for `success`, `error`, `warning`, and `info` toast types
- support for six positions from `top-left` to `bottom-right`
- compatibility with standard Laravel session flash keys
- promise-based confirmation flow for delete and danger actions

## Configuration and dependencies

This package aims for low configuration, not zero dependencies.

### App-side configuration

- no manual service provider registration in a normal Laravel app
- no manual middleware registration in a normal Laravel app
- one Vue plugin registration in your Inertia entry file
- optional default position configuration on the Vue plugin

### Laravel dependencies

- PHP `>= 8.1`
- Laravel `10`, `11`, `12`, or `13`
- `inertiajs/inertia-laravel` `^1.3`, `^2.0`, or `^3.0`

### Vue dependencies

- Vue `3`
- `@inertiajs/core` `^2.0` or `^3.0`
- `@inertiajs/vue3` `^2.0` or `^3.0`

## Quick example

::: code-group

```php [Laravel Controller]
public function store()
{
    // Persist your record...

    toast('Post created successfully', 'success', 'Saved');

    return redirect()->route('posts.index');
}
```

```ts [resources/js/app.ts]
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

```vue [Vue Component]
<script setup lang="ts">
import { useConfirmation } from '@erag/inertia-toast';
import { router } from '@inertiajs/vue3';

const { confirm } = useConfirmation();

const destroyPost = async (id: number) => {
    const accepted = await confirm({
        title: 'Delete post',
        message: 'This action cannot be undone.',
        type: 'danger',
        confirmText: 'Delete',
    });

    if (!accepted) {
        return;
    }

    router.delete(route('posts.destroy', id));
};
</script>
```

:::

## What happens automatically

1. Laravel flashes a `toast` payload into the session.
2. The package middleware shares that payload with Inertia as `props.toast`.
3. The Vue plugin listens for the initial page payload and later Inertia success events.
4. The toast container renders the message without page-specific setup.

## Documentation map

- [Installation](/installation): install both package sides and register the Vue plugin
- [Laravel Usage](/laravel): helper, facade, flash payloads, and redirect patterns
- [Vue Usage](/vue): plugin setup, composables, confirmations, and component examples
- [API Reference](/api-reference): supported types, positions, payload shape, and method signatures
