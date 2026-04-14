---
title: Laravel Usage
description: Learn how to use the Laravel side of Laravel Inertia Toast with the toast helper, InertiaToast facade, flash payloads, and redirect flows.
head:
  - - meta
    - name: description
      content: Learn how to use the Laravel side of Laravel Inertia Toast with the toast helper, InertiaToast facade, flash payloads, and redirect flows.
---

# Laravel Usage

The Laravel package is responsible for building the toast payload and exposing it to Inertia.

## `toast()` helper

The helper flashes a normalized payload into the session:

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
toast('Profile updated successfully');
```

### Full usage

```php
toast('Please review the highlighted fields', 'warning', 'Validation warning', 4500, 'top-right');
```

## Typical controller patterns

### Create flow

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
    ]);

    Post::create($validated);

    toast('Post created successfully', 'success', 'Created');

    return redirect()->route('posts.index');
}
```

### Update flow

```php
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

### Delete flow

```php
public function destroy(Post $post)
{
    $post->delete();

    toast('Post deleted successfully', 'success', 'Deleted', 3000, 'top-right');

    return redirect()->route('posts.index');
}
```

## `InertiaToast` facade

Use the facade when you want to inspect the resolved flash payload directly:

```php
use InertiaToast;

$toast = InertiaToast::flash();
```

The loader resolves:

- `session('toast')` first
- standard Laravel flash keys second
- an empty array if nothing is available

## Standard Laravel flash support

If your app already flashes common session values, the package converts them into a toast payload.

Supported keys:

- `message`
- `type`
- `title`
- `duration`
- `position`

### Example

```php
return back()->with([
    'type' => 'success',
    'title' => 'Success',
    'message' => 'Updated successfully',
    'duration' => 3000,
]);
```

```php
return redirect()
    ->route('dashboard')
    ->with('message', 'Welcome back')
    ->with('type', 'success')
    ->with('title', 'Login successful')
    ->with('duration', 3500)
    ->with('position', 'top-right');
```

## Shared Inertia prop

The middleware shares a single prop:

```php
toast
```

That means your Inertia page payload includes `props.toast` when a toast exists.

## Notes

- The package is designed for redirect and visit flows where flash session data is already natural.
- A toast with `duration` set to `0` remains visible until removed on the client side.
