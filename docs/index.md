---
layout: home
title: Laravel Inertia Toast Docs
description: Official Laravel Inertia Toast documentation for dynamic toast notifications, confirmation dialogs, Laravel integration, Vue 3 usage, React usage, and API reference.
keywords:
  - laravel inertia toast docs
  - laravel toast notifications
  - inertia toast package
  - vue 3 toast plugin
  - react toast package
  - confirmation dialog docs
head:
  - - meta
    - name: description
      content: Official Laravel Inertia Toast documentation for dynamic toast notifications, confirmation dialogs, Laravel integration, Vue 3 usage, React usage, and API reference.
  - - meta
    - name: keywords
      content: laravel inertia toast docs, laravel toast notifications, inertia toast package, vue 3 toast plugin, react toast package, confirmation dialog docs

hero:
  name: "Laravel Inertia Toast"
  text: "Notifications and confirmation dialogs for Laravel + Inertia + Vue 3 + React"
  tagline: "Dynamic toast messages and confirm dialogs for your Laravel Inertia app."
  actions:
    - theme: brand
      text: Get Started
      link: /demo
    - theme: alt
      text: React Usage
      link: /react
---

<div class="lit-grid lit-grid--compact">
  <div class="lit-card lit-card--package">
    <h3>Low Dependency Surface</h3>
    <p>Built to fit the Laravel and Inertia stack you already use without adding heavy extra setup.</p>
  </div>
  <div class="lit-card lit-card--setup">
    <h3>Almost Zero Config</h3>
    <p>Add the package, register it once, and it works with your app structure in a familiar way.</p>
  </div>
  <div class="lit-card lit-card--helper">
    <h3>Laravel Helper</h3>
    <p>Flash toast payloads from controllers with a single <code>toast()</code> call.</p>
  </div>
  <div class="lit-card lit-card--bridge">
    <h3>Inertia Flash</h3>
    <p>Share toast data through Inertia without page-level wiring.</p>
  </div>
  <div class="lit-card lit-card--vue">
    <h3>Vue Setup</h3>
    <p>Register the Vue plugin once for toasts and confirmation dialogs.</p>
  </div>
  <div class="lit-card lit-card--react">
    <h3>React Setup</h3>
    <p>Use the provider or initializer once in your React app.</p>
  </div>
  <div class="lit-card lit-card--typescript">
    <h3>Typed Frontend API</h3>
    <p>Use typed plugin options, positions, modal options, and composables in Vue 3 or React projects.</p>
  </div>
  <div class="lit-card lit-card--confirm">
    <h3>Confirm Flows</h3>
    <p>Handle delete and danger actions with promise-based confirmations.</p>
  </div>
</div>



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

```vue [Vue Component]
<script setup lang="ts">
import { useConfirmation, useToast } from '@erag/inertia-toast-vue';
import { router } from '@inertiajs/vue3';

const { confirm } = useConfirmation();
const toast = useToast();

const showToast = () => {
    toast.success('Profile updated successfully', 'Saved');
};

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

<template>
    <button type="button" @click="showToast">
        Show toast
    </button>
</template>
```

```tsx [React Page]
import { router } from '@inertiajs/react';
import { useConfirmation, useToast } from '@erag/inertia-toast-react';

export default function PostsIndex() {
    const toast = useToast();
    const confirmation = useConfirmation();

    const showToast = () => {
        toast.success('Profile updated successfully', 'Saved');
    };

    const destroyPost = async (id: number) => {
        const accepted = await confirmation.confirm({
            title: 'Delete post',
            message: 'This action cannot be undone.',
            type: 'danger',
            confirmText: 'Delete',
        });

        if (!accepted) {
            toast.info('Delete cancelled', 'Cancelled');
            return;
        }

        router.delete(route('posts.destroy', id));
    };

    return <button onClick={showToast}>Show toast</button>;
}
```

:::

### All toast props are dynamic

The Laravel helper supports full per-toast customization:

```php
toast(
    string $message,
    string $type = 'success',
    ?string $title = null,
    int $duration = 3000,
    ?string $position = null
);
```

That means:

- `message` is the main text shown in the toast
- `type` changes the variant like `success`, `error`, `warning`, or `info`
- `title` adds an optional heading
- `duration` controls auto close time in milliseconds
- `position` can override the default plugin position for one specific toast

### Full dynamic example

```php
public function store()
{
    // Persist your record...

    toast(
        message: 'Post created successfully',
        type: 'success',
        title: 'Saved',
        duration: 3000,
        position: 'top-right',
    );

    return redirect()->route('posts.index');
}
```

With the same helper, you can also send different kinds of toasts without changing frontend setup:

```php
toast('Draft saved automatically', 'info', 'Auto Save', 2500, 'bottom-right');
toast('Unable to publish post', 'error', 'Publish failed', 5000, 'top-center');
toast('Connection lost', 'warning', 'Network issue', 0, 'bottom-center');
```



## Why this package

`Laravel Inertia Toast` connects Laravel flash messages to an Inertia-powered Vue 3 or React UI without extra wiring in every page.

It is built for apps that want:

- a simple backend helper for redirect-based notifications
- a Vue or React API for client-side toasts
- a reusable confirmation modal for destructive actions
- automatic sharing through the Laravel `web` middleware group
- minimal app-level configuration
- dynamic props for every individual toast
