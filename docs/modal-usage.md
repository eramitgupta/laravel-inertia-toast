---
title: Modal Usage
description: Learn how to use promise-based confirmation modals in Vue and React with Laravel Inertia Toast for delete flows, warning actions, and important user confirmations.
keywords:
  - vue confirmation modal
  - react confirmation modal
  - inertia modal usage
  - promise based modal
  - delete confirmation
  - warning modal
head:
  - - meta
    - name: description
      content: Learn how to use promise-based confirmation modals in Vue and React with Laravel Inertia Toast for delete flows, warning actions, and important user confirmations.
  - - meta
    - name: keywords
      content: vue confirmation modal, react confirmation modal, inertia modal usage, promise based modal, delete confirmation, warning modal
---

# Modal Usage

Use the confirmation modal when the user needs to approve an action before it continues.

Common cases:

- deleting data
- logging out
- discarding changes
- publishing or submitting something important

The modal API is promise-based, so the code stays simple and linear.

## Basic example

Import `useConfirmation()` and call `confirm()`.

::: code-group

```ts [Vue]
import { useConfirmation } from '@erag/inertia-toast-vue';

const modal = useConfirmation();

const ok = await modal.confirm({
    title: 'Delete?',
    message: 'Are you sure?',
    type: 'danger',
});
```

```ts [React]
import { useConfirmation } from '@erag/inertia-toast-react';

const confirmation = useConfirmation();

const ok = await confirmation.confirm({
    title: 'Delete?',
    message: 'Are you sure?',
    type: 'danger',
});
```

:::

- `true` means the user confirmed
- `false` means the user cancelled or closed the modal

## Delete action

This is the most common modal flow.

::: code-group

```vue [Vue]
<script setup lang="ts">
import { useConfirmation, useToast } from '@erag/inertia-toast-vue';

const modal = useConfirmation();
const toast = useToast();

const handleDelete = async () => {
    const isConfirmed = await modal.confirm({
        title: 'Delete account?',
        message: 'Are you sure? This action cannot be undone.',
        confirmText: 'Yes, Delete',
        cancelText: 'No, Keep it',
        type: 'danger',
    });

    if (isConfirmed) {
        toast.success('Account deleted successfully');
        return;
    }

    toast.info('Action cancelled');
};
</script>
```

```tsx [React]
import { useConfirmation, useToast } from '@erag/inertia-toast-react';

export default function DeleteAccountButton() {
    const confirmation = useConfirmation();
    const toast = useToast();

    const handleDelete = async (): Promise<void> => {
        const isConfirmed = await confirmation.confirm({
            title: 'Delete account?',
            message: 'Are you sure? This action cannot be undone.',
            confirmText: 'Yes, Delete',
            cancelText: 'No, Keep it',
            type: 'danger',
        });

        if (isConfirmed) {
            toast.success('Account deleted successfully');
            return;
        }

        toast.info('Action cancelled');
    };

    return <button onClick={handleDelete}>Delete account</button>;
}
```

:::

## Delete action with Inertia

Use this pattern when the final action should call the server.

::: code-group

```vue [Vue]
<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { useConfirmation } from '@erag/inertia-toast-vue';

const modal = useConfirmation();

const removePost = async (id: number) => {
    const ok = await modal.confirm({
        title: 'Delete post',
        message: 'This action cannot be undone.',
        type: 'danger',
        confirmText: 'Delete',
        cancelText: 'Cancel',
    });

    if (!ok) {
        return;
    }

    router.delete(route('posts.destroy', id));
};
</script>
```

```tsx [React]
import { router } from '@inertiajs/react';
import { useConfirmation } from '@erag/inertia-toast-react';

export default function PostsIndex() {
    const confirmation = useConfirmation();

    const removePost = async (id: number): Promise<void> => {
        const ok = await confirmation.confirm({
            title: 'Delete post',
            message: 'This action cannot be undone.',
            type: 'danger',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });

        if (!ok) {
            return;
        }

        router.delete(route('posts.destroy', id));
    };
}
```

:::

## What happens when you `await`

```ts
const ok = await modal.confirm({ ... });
```

Flow:

1. Your action starts.
2. The modal opens.
3. Code pauses at `await`.
4. Confirm resolves `true`.
5. Cancel or close resolves `false`.
6. Your code continues with that result.

## Modal types

Use `type` to control the intent and button styling.

::: code-group

```ts [Vue]
type: 'danger'
type: 'warning'
type: 'info'
type: 'success'
```

```ts [React]
type: 'danger'
type: 'warning'
type: 'info'
type: 'success'
```

:::

- `danger` for destructive actions
- `warning` for risky actions
- `info` for neutral confirmation
- `success` for positive confirmation

## Logout example

::: code-group

```ts [Vue]
const logout = async () => {
    const ok = await modal.confirm({
        title: 'Logout',
        message: 'You have unsaved changes. Do you really want to leave?',
        confirmText: 'Logout',
        type: 'warning',
    });

    if (ok) {
        // Perform logout
    }
};
```

```ts [React]
const logout = async (): Promise<void> => {
    const ok = await confirmation.confirm({
        title: 'Logout',
        message: 'You have unsaved changes. Do you really want to leave?',
        confirmText: 'Logout',
        type: 'warning',
    });

    if (ok) {
        // Perform logout
    }
};
```

:::

## Custom icon

Pass an SVG string if you want to replace the default icon.

::: code-group

```ts [Vue]
await modal.confirm({
    title: 'Custom Icon',
    message: 'This modal uses a custom icon.',
    icon: `<svg viewBox="0 0 24 24">...</svg>`,
});
```

```ts [React]
await confirmation.confirm({
    title: 'Custom Icon',
    message: 'This modal uses a custom icon.',
    icon: `<svg viewBox="0 0 24 24">...</svg>`,
});
```

:::

## Modal options

| Option | Type | Description |
| --- | --- | --- |
| `title` | `string` | Modal heading |
| `message` | `string` | Modal body text |
| `confirmText` | `string` | Confirm button label |
| `cancelText` | `string` | Cancel button label |
| `type` | `'danger' \| 'warning' \| 'info' \| 'success'` | Style and intent |
| `icon` | `string` | Custom icon that replaces the default icon |
