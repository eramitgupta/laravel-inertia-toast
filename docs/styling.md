---
title: Styling · Toast & Modal CSS
description: Learn how toast and modal styling works in the Vue and React packages, including stylesheet imports, scoped classes, and customization notes.
keywords:
  - vue toast css
  - react toast css
  - modal css
  - erag toast styling
  - scoped css
  - toast css prefix
head:
  - - meta
    - name: description
      content: Learn how toast and modal styling works in the Vue and React packages, including stylesheet imports, scoped classes, and customization notes.
  - - meta
    - name: keywords
      content: vue toast css, react toast css, modal css, erag toast styling, scoped css, toast css prefix
---

# Styling

Both frontend packages ship with their own stylesheet.

All classes use the `erag-` prefix, so the styles stay isolated from the rest of your app.

That makes it safe to use with Tailwind, Bootstrap, or your own CSS.

## Import the stylesheet

::: code-group

```ts [Vue]
import '@erag/inertia-toast-vue/style.css';
```

```ts [React]
import '@erag/inertia-toast-react/style.css';
```

:::

## Scoped classes

Every CSS class used internally starts with:

```text
erag-
```

This helps avoid problems like:

- button styles being overridden
- modal layouts breaking
- toast animations conflicting with global styles

You do not need to rename anything before using the package.

## Common classes

These are the main classes you will usually override.

### Toast

- `.erag-toast-container` - Toast container
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

## Custom styling

If you want to change the look, override these classes in your app stylesheet.

### Change toast width

```css
.erag-toast {
    max-width: 420px;
}
```

### Change confirm button color

```css
.erag-btn-confirm {
    background-color: #dc2626;
}
```

### Change modal radius

```css
.erag-modal {
    border-radius: 20px;
}
```

## Styling note

The package CSS gives you the default look. You can keep it as-is or override only the parts you want.
