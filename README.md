# Laravel Inertia Toast

Toast notifications for Laravel + Inertia.js, with a Vue 3 frontend plugin and a built-in confirmation modal.

It gives you a simple backend API:

```php
toast('Post created successfully');
```

and handles the rest:

- flashes toast data into the session
- shares that data with Inertia automatically
- renders the toast in your Vue app

## Packages

- Laravel package: `erag/laravel-inertia-toast`
- Vue package: `@erag/inertia-toast`

## Features

- Laravel `toast()` helper
- Laravel `InertiaToast` facade
- automatic Inertia shared prop: `toast`
- automatic middleware registration on the `web` group
- Vue 3 toast container
- Vue 3 confirmation modal
- `useToast()` composable
- `useConfirmation()` composable
- six toast positions
- support for standard Laravel flash session keys

## Requirements

- PHP `>= 8.1`
- Laravel `10`, `11`, `12`, or `13`
- `inertiajs/inertia-laravel` `^1.3 | ^2.0 | ^3.0`
- Vue `3`
- `@inertiajs/core` `^2.0 || ^3.0`
- `@inertiajs/vue3` `^2.0 || ^3.0`

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Laravel Usage](#laravel-usage)
- [Vue Usage](#vue-usage)
- [API Reference](#api-reference)
- [Toast Payload](#toast-payload)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

### 1. Install the Laravel package

```bash
composer require erag/laravel-inertia-toast
```

Laravel package discovery registers the service provider automatically.

### 2. Install the Vue package

Install the frontend package in your Inertia app:

```bash
npm install @erag/inertia-toast
```

or:

```bash
yarn add @erag/inertia-toast
```

### 3. Register the Vue plugin

In `resources/js/app.js` or `resources/js/app.ts`:

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

That is the only frontend setup required.

## Quick Start

### Laravel controller

```php
public function store()
{
    // Save your record...

    toast('Post created successfully', 'success', 'Done');

    return redirect()->route('posts.index');
}
```

### Result

After the redirect:

- Laravel flashes the toast data
- Inertia receives it as the shared `toast` prop
- the Vue plugin displays the toast automatically

## How It Works

On the Laravel side, the package:

- registers the global `toast()` helper
- registers the `InertiaToast` facade
- pushes `ShareInertiaToastMiddleware` into the `web` middleware group

The middleware shares:

```php
toast
```

On the Vue side, the plugin mounts:

- a toast container
- a confirmation modal container
- a flash bridge that listens for the initial Inertia page and later `inertia:success` events

This means Laravel flash toasts work automatically after redirects and regular Inertia visits.

## Laravel Usage

### Helper signature

```php
toast(
    string $message,
    string $type = 'success',
    ?string $title = null,
    int $duration = 3000,
    ?string $position = null
): void;
```

### Basic usage

```php
toast('Saved successfully');
```

### More examples

```php
toast('Profile updated', 'success', 'Success');

toast('Something went wrong', 'error', 'Error', 6000);

toast('Please review the highlighted fields', 'warning', 'Warning', 4500, 'top-right');

toast('Background sync started', 'info', 'Info', 5000, 'bottom-center');
```

### Real controller example

```php
use Illuminate\Http\Request;

public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email'],
    ]);

    $user->update($validated);

    toast('User updated successfully', 'success', 'Updated');

    return back();
}
```

### Facade usage

The facade is useful when you want to inspect the normalized flash payload:

```php
use InertiaToast;

$toast = InertiaToast::flash();
```

### Standard Laravel flash support

If your app already uses normal session flash keys, this package can convert them into a toast.

Supported session keys:

- `message`
- `type`
- `title`
- `duration`
- `position`

Example:

```php
return redirect()
    ->route('dashboard')
    ->with('message', 'Welcome back')
    ->with('type', 'success')
    ->with('title', 'Login successful')
    ->with('duration', 3500)
    ->with('position', 'top-right');
```

## Vue Usage

### Plugin setup

```ts
import ToastPlugin from '@erag/inertia-toast';
import '@erag/inertia-toast/dist/style.css';

app.use(ToastPlugin, {
    position: 'bottom-right',
});
```

### Plugin options

```ts
type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

interface PluginOptions {
    position?: ToastPosition;
}
```

### `useToast()`

Import:

```ts
import { useToast } from '@erag/inertia-toast';
```

Example:

```ts
const toast = useToast();

toast.success('Saved successfully');
toast.error('Unable to save', 'Error');
toast.warning('Disk space is low', 'Warning', 5000, 'top-right');
toast.info('Background sync started', 'Info');
```

Example inside a component:

```vue
<script setup lang="ts">
import { useToast } from '@erag/inertia-toast';

const toast = useToast();

const notify = () => {
    toast.success('Settings saved', 'Success', 3000, 'bottom-right');
};
</script>

<template>
    <button @click="notify">
        Show toast
    </button>
</template>
```

### `useConfirmation()`

Import:

```ts
import { useConfirmation } from '@erag/inertia-toast';
```

Example:

```ts
const { confirm } = useConfirmation();

const destroyRecord = async () => {
    const accepted = await confirm({
        title: 'Delete record',
        message: 'This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
    });

    if (!accepted) {
        return;
    }

    // Continue delete request...
};
```

Another example:

```ts
await confirm({
    title: 'Leave page',
    message: 'Unsaved changes will be lost.',
    type: 'warning',
    confirmText: 'Leave',
    cancelText: 'Stay',
});
```

### End-to-end delete flow

Laravel controller:

```php
public function destroy(Post $post)
{
    $post->delete();

    toast('Post deleted successfully', 'success', 'Deleted', 3000, 'top-right');

    return redirect()->route('posts.index');
}
```

Vue page:

```vue
<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useConfirmation } from '@erag/inertia-toast';

const { confirm } = useConfirmation();

const removePost = async (id: number) => {
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

After the redirect, the Laravel flash toast is displayed automatically.

## API Reference

### Toast types

- `success`
- `error`
- `warning`
- `info`

### Toast positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

### `toast()` helper

```php
toast(
    string $message,
    string $type = 'success',
    ?string $title = null,
    int $duration = 3000,
    ?string $position = null
): void;
```

### `useToast()` methods

```ts
toast.show(type, title, message, duration?, position?);
toast.success(message, title?, duration?, position?);
toast.error(message, title?, duration?, position?);
toast.warning(message, title?, duration?, position?);
toast.info(message, title?, duration?, position?);
toast.remove(id);
toast.setPosition(position);
```

### `useConfirmation()` options

```ts
type ModalType = 'danger' | 'info' | 'warning' | 'success';

interface ModalOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: ModalType;
    icon?: string;
}
```

## Toast Payload

The shared Inertia prop is expected to match this shape:

```ts
type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

interface ToastPayload {
    id: string | number;
    type: ToastType;
    title?: string | null;
    message: string;
    duration?: number;
    position?: ToastPosition;
}
```

Example:

```json
{
    "id": "6612af5b4f145",
    "type": "success",
    "title": "Saved",
    "message": "Profile updated successfully",
    "duration": 3000,
    "position": "top-right"
}
```

## Troubleshooting

### Toast not showing

Check these first:

- the Vue plugin is registered
- `@erag/inertia-toast/dist/style.css` is imported
- your request returns an Inertia response or redirect
- your page uses the normal Inertia app bootstrap

### Middleware question

You do not need to register middleware manually in a standard Laravel app. The package pushes its middleware into the `web` group automatically.

### Toast stays visible forever

If `duration` is `0`, the toast remains visible until removed manually.

### Position looks wrong

The plugin-level `position` sets the default client-side position. A toast payload can still override it per message.

## Notes

- The package is designed for Laravel + Inertia.js apps using Vue 3.
- The backend helper writes flash data; the frontend plugin is responsible for rendering it.
- The confirmation modal is frontend-only and does not depend on Laravel flash data.

## License

MIT
