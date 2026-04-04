---
title: Styling · Toast & Modal CSS
description: Learn how styling works in @erag/inertia-toast. All CSS is safely scoped with the erag- prefix to avoid conflicts with Tailwind, Bootstrap, or custom styles.
keywords:
  - vue toast css
  - vue modal css
  - vue notification styling
  - erag toast styling
  - scoped css vue plugin
  - vue toast css prefix
---

# Styling

`@erag/inertia-toast` is designed to be safe by default when it comes to CSS.

All styles used by the library are scoped with a unique `erag-` prefix, so they do not clash with your existing styles or UI frameworks.

This means you can use it with Tailwind CSS, Bootstrap, Vuetify, or your own custom CSS.

## Scoped CSS

Every CSS class used internally starts with:

```text
erag-
```

This helps avoid issues like:

- button styles being overridden
- modal layouts breaking
- toast animations conflicting with global styles

You do not need to rename anything or worry about style conflicts.

## Common CSS Classes

Here are some of the main classes used by the library.

### Toast

- `.erag-toast-container` - Main toast wrapper
- `.erag-toast` - Individual toast item
- `.erag-toast-success` - Success toast
- `.erag-toast-error` - Error toast
- `.erag-toast-warning` - Warning toast
- `.erag-toast-info` - Info toast

### Modal

- `.erag-modal-backdrop` - Modal overlay background
- `.erag-modal` - Modal container
- `.erag-modal-title` - Modal heading
- `.erag-modal-message` - Modal text content
- `.erag-btn-confirm` - Confirm button
- `.erag-btn-cancel` - Cancel button

## Custom Styling

If you want to customize the look, you can safely override styles using the same class names.

### Example: Custom Toast Width

```css
.erag-toast {
  max-width: 420px;
}
```

### Example: Change Confirm Button Color

```css
.erag-btn-confirm {
  background-color: #dc2626;
}
```
