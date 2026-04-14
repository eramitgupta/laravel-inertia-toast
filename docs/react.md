---
title: React Usage
description: Learn how to use the React frontend package, hooks, confirmation modal, and Inertia flash bridge in Laravel Inertia Toast.
head:
  - - meta
    - name: description
      content: Learn how to use the React frontend package, hooks, confirmation modal, and Inertia flash bridge in Laravel Inertia Toast.
---

# React Usage

The React package handles rendering, client-side notifications, and promise-based confirmations for Inertia React apps.

## Provider registration

The recommended setup is to wrap your Inertia app once in `InertiaToastProvider`:

```tsx
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

The provider mounts:

- `ToastContainer`
- `ConfirmationBox`
- `FlashToastBridge`

## Standalone initialization

If you do not want to wrap the app tree, you can initialize the package once at startup:

```ts
import initializeToast from '@erag/inertia-toast-react';
import '@erag/inertia-toast-react/style.css';

initializeToast({
    position: 'bottom-right',
});
```

## Provider options

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

## `useToast()`

Use `useToast()` when you want to trigger client-side notifications without waiting for a Laravel redirect.

```ts
import { useToast } from '@erag/inertia-toast-react';

const toast = useToast();

toast.success('Saved successfully');
toast.error('Unable to save', 'Error');
toast.warning('Disk space is low', 'Warning', 5000, 'top-right');
toast.info('Background sync started', 'Info');
```

### In a page or component

```tsx
import { useToast } from '@erag/inertia-toast-react';

export default function ToastExample() {
    const toast = useToast();

    return (
        <button
            type="button"
            onClick={() => {
                toast.success('Settings saved', 'Success', 3000, 'bottom-right');
            }}
        >
            Show toast
        </button>
    );
}
```

## `useConfirmation()`

The confirmation hook returns a promise, which keeps destructive flows straightforward.

```ts
import { useConfirmation } from '@erag/inertia-toast-react';

const confirmation = useConfirmation();

const accepted = await confirmation.confirm({
    title: 'Delete record',
    message: 'This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
});
```

### Delete flow with Inertia router

```tsx
import { router } from '@inertiajs/react';
import { useConfirmation } from '@erag/inertia-toast-react';

export default function PostsIndex() {
    const confirmation = useConfirmation();

    const removePost = async (id: number): Promise<void> => {
        const accepted = await confirmation.confirm({
            title: 'Delete post',
            message: 'This action cannot be undone.',
            type: 'danger',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });

        if (!accepted) {
            return;
        }

        router.delete(route('posts.destroy', id));
    };
}
```

### End-to-end example from the demo page

This is the same pattern used in the React demo:

```tsx
import { router } from '@inertiajs/react';
import { success } from '@/actions/App/Http/Controllers/ToastDemoController';
import { useToast } from '@erag/inertia-toast-react';

export default function ToastDemo() {
    const toast = useToast();

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    toast.success(
                        'Client-side success toast from React.',
                        'Success',
                        4500,
                        'bottom-right',
                    );
                }}
            >
                Client Toast
            </button>

            <button
                type="button"
                onClick={() => {
                    router.post(success.url(), {}, { preserveScroll: true });
                }}
            >
                Server Toast
            </button>
        </>
    );
}
```

Laravel controller example:

```php
public function success(): RedirectResponse
{
    toast(
        message: 'Server-side success toast from Laravel.',
        type: 'success',
        title: 'Success',
        duration: 3000,
    );

    return to_route('toasts.index');
}
```

## Flash bridge behavior

The React package includes `FlashToastBridge`, which does two things automatically:

1. Reads the initial `data-page` payload rendered by Inertia.
2. Listens for later `inertia:success` events and checks `page.props.toast`.

That is why Laravel flash toasts appear automatically after redirects and later visits.

## Practical guidance

- Use Laravel `toast()` for redirect-based success and error messages.
- Use `useToast()` for purely client-side actions.
- Use `useConfirmation()` before destructive requests, then let Laravel return the final success toast.
