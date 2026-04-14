---
name: laravel-inertia-toast-development
description: "Activate when working on the Laravel Inertia Toast package itself. Use for changes to the Laravel package, toast flash payloads, middleware registration, service provider behavior, facade or helper APIs, and package documentation covering Laravel, Vue, or React usage."
license: MIT
metadata:
  author: erag
---

# Laravel Inertia Toast Development

Use this skill when changing the Laravel Inertia Toast package source, package docs, or frontend package integration examples.

## Focus Areas

- Keep the package low-config for Laravel applications.
- Prefer behavior that works without asking users to register extra middleware manually.
- Keep Laravel, Vue, and React documentation aligned when APIs or package names change.
- Preserve stable public APIs unless the task explicitly calls for a breaking change.

## Package Structure

- Laravel package code lives in `src/`
- Vue package code lives in `vue/`
- React package code lives in `react/`
- Documentation lives in `docs/docs/`

## Laravel Package Notes

- `toast()` and `InertiaToast` should stay simple and redirect-friendly.
- Shared toast data should reach Inertia without route-group-specific setup where possible.
- Middleware, helper, facade, and service provider changes should be tested from the host Laravel app.

## Frontend Package Notes

- Vue package name: `@erag/inertia-toast-vue`
- React package name: `@erag/inertia-toast-react`
- Keep examples and style import paths consistent with these package names.

## Verification

- Run `vendor/bin/pint --dirty --format agent` after PHP changes in the host app.
- Run targeted Laravel tests from the host app with `php artisan test --compact ...`.
- Run `npm run build` inside `docs/` after documentation changes.
