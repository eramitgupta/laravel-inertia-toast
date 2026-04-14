---
title: API Reference
description: Full API reference for Laravel Inertia Toast, including toast types, positions, helper arguments, composables, modal options, and shared payload shape.
keywords:
  - laravel inertia toast api
  - toast helper signature
  - toast payload reference
  - vue toast api
  - react toast api
head:
  - - meta
    - name: description
      content: Full API reference for Laravel Inertia Toast, including toast types, positions, helper arguments, composables, modal options, and shared payload shape.
  - - meta
    - name: keywords
      content: laravel inertia toast api, toast helper signature, toast payload reference, vue toast api, react toast api
---

# API Reference

## Toast types

```ts
type ToastType = 'success' | 'error' | 'warning' | 'info';
```

## Toast positions

```ts
type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
```

## Laravel helper

```php
toast(
    string $message,
    string $type = 'success',
    ?string $title = null,
    int $duration = 3000,
    ?string $position = null
): void;
```

## `useToast()` methods

```ts
toast.show(type, title, message, duration?, position?);
toast.success(message, title?, duration?, position?);
toast.error(message, title?, duration?, position?);
toast.warning(message, title?, duration?, position?);
toast.info(message, title?, duration?, position?);
toast.remove(id);
toast.setPosition(position);
```

## `useConfirmation()` types

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

## Shared Inertia payload

The frontend expects the shared `toast` prop to follow this shape:

```ts
interface ToastPayload {
    id: string | number;
    type: ToastType;
    title?: string | null;
    message: string;
    duration?: number;
    position?: ToastPosition;
}
```

### Example payload

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

### Toast does not render

Check these first:

- the plugin is registered with `app.use(ToastPlugin)`
- `@erag/inertia-toast-vue/style.css` is imported
- the request returns an Inertia response or redirect
- the page payload contains `props.toast`

### Position is not what you expect

The plugin option sets the default container position. A toast payload can still override the position per message.

### Toast never closes

If the `duration` is `0`, the toast remains visible until removed manually.
