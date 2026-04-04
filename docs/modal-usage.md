---
title: Modal Usage · Vue Confirmation Dialogs
description: Learn how to use promise-based confirmation modals in Vue 3 with @erag/inertia-toast. Perfect for delete, logout, and critical actions.
keywords:
  - vue confirmation modal
  - vue modal usage
  - vue 3 confirm dialog
  - vue promise based modal
  - vue delete confirmation
  - vue warning modal
---

# Modal Usage

Confirmation modals are used when you want the user to confirm an action before continuing.
Common examples include deleting data, logging out, or performing irreversible operations.

With `@erag/inertia-toast`, modals are designed to be:

- Promise-based with `async` and `await`
- Easy to read and use
- Free from callback chains
- Fully typed with TypeScript
- Clean and predictable

## Basic Modal Example

Import the `useConfirmation` composable and call `confirm()`.

```ts
import { useConfirmation } from '@erag/inertia-toast';

const modal = useConfirmation();

const ok = await modal.confirm({
  title: 'Delete?',
  message: 'Are you sure?',
  type: 'danger'
});
```

- If the user confirms, `ok` will be `true`
- If the user cancels or closes, `ok` will be `false`

## Real-World Example: Delete Action

This is the most common use case for confirmation modals.

```vue
<script setup lang="ts">
import { useConfirmation, useToast } from '@erag/inertia-toast';

const modal = useConfirmation();
const toast = useToast();

const handleDelete = async () => {
    const isConfirmed = await modal.confirm({
        title: 'Delete Account?',
        message: 'Are you sure? This action cannot be undone.',
        confirmText: 'Yes, Delete',
        cancelText: 'No, Keep it',
        type: 'danger'
    });

    if (isConfirmed) {
        // Perform delete logic here
        toast.success('Account deleted successfully');
    } else {
        toast.info('Action cancelled');
    }
};
</script>
```

## What Happens Internally?

```ts
const isConfirmed = await modal.confirm({ ... });
```

### Step-by-Step Flow

1. `handleDelete()` is called
2. The confirmation modal opens
3. Code execution pauses at `await`
4. User takes an action:
   Confirm resolves `true`
   Cancel or close resolves `false`
5. Code continues based on the result

This makes your logic linear, readable, and safe.

## Modal Types

You can control the intent and color of the confirm button using `type`.

### `danger` - Destructive Actions

```ts
type: 'danger'
```

Use for:

- Delete account
- Remove data
- Permanent actions

### `warning` - Risky Actions

```ts
type: 'warning'
```

Use for:

- Logout
- Discard changes
- Navigation with unsaved data

### `info` - Neutral Confirmations

```ts
type: 'info'
```

Use for:

- General confirmations
- Informational prompts

## Example: Logout Confirmation

```ts
const logout = async () => {
    const ok = await modal.confirm({
        title: 'Logout',
        message: 'You have unsaved changes. Do you really want to leave?',
        confirmText: 'Logout',
        type: 'warning'
    });

    if (ok) {
        // Perform logout
    }
};
```

## Custom Icon

You can pass a custom SVG icon. When `icon` is provided, the default icons are not used.

```ts
await modal.confirm({
  title: 'Custom Icon',
  message: 'This modal uses a custom icon.',
  icon: `<svg viewBox="0 0 24 24">...</svg>`
});
```

## Modal Options Reference

| Option | Type | Description |
| --- | --- | --- |
| `title` | `string` | Modal heading |
| `message` | `string` | Modal message text |
| `confirmText` | `string` | Confirm button label |
| `cancelText` | `string` | Cancel button label |
| `type` | `'danger' \| 'warning' \| 'info'` | Button style and intent |
| `icon` | `string` | Custom icon that overrides the default icon |
