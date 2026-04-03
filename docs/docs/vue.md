# Vue Usage

The Vue package handles rendering, client-side notifications, and promise-based confirmations.

## Plugin registration

Register the plugin once in your Inertia bootstrap file:

```ts
import ToastPlugin from '@erag/inertia-toast';
import '@erag/inertia-toast/dist/style.css';

app.use(ToastPlugin, {
    position: 'bottom-right',
});
```

The plugin mounts:

- `ToastContainer`
- `ConfirmationBox`
- `FlashToastBridge`

## Plugin options

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
import { useToast } from '@erag/inertia-toast';

const toast = useToast();

toast.success('Saved successfully');
toast.error('Unable to save', 'Error');
toast.warning('Disk space is low', 'Warning', 5000, 'top-right');
toast.info('Background sync started', 'Info');
```

### In a component

```vue
<script setup lang="ts">
import { useToast } from '@erag/inertia-toast';

const toast = useToast();

const notify = () => {
    toast.success('Settings saved', 'Success', 3000, 'bottom-right');
};
</script>

<template>
    <button type="button" @click="notify">
        Show toast
    </button>
</template>
```

## `useConfirmation()`

The confirmation composable returns a promise, which makes destructive flows simple to write.

```ts
import { useConfirmation } from '@erag/inertia-toast';

const { confirm } = useConfirmation();

const accepted = await confirm({
    title: 'Delete record',
    message: 'This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
});
```

### Delete flow with Inertia router

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
        cancelText: 'Cancel',
    });

    if (!accepted) {
        return;
    }

    router.delete(route('posts.destroy', id));
};
</script>
```

## Flash bridge behavior

The plugin includes `FlashToastBridge`, which does two things automatically:

1. Reads the initial `data-page` payload rendered by Inertia.
2. Listens for later `inertia:success` events and checks `page.props.toast`.

That is why Laravel flash toasts appear automatically after redirects and later visits.

## Practical guidance

- Use Laravel `toast()` for redirect-based success and error messages.
- Use `useToast()` for purely client-side actions.
- Use `useConfirmation()` before destructive requests, then let Laravel return the final success toast.
