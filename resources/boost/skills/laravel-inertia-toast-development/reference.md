# Laravel Inertia Toast Reference

## Package Areas

- Laravel package: `src/`
- Vue package: `vue/`
- React package: `react/`
- Docs: `docs/docs/`

## Public Package Names

- Laravel package: `erag/laravel-inertia-toast`
- Vue package: `@erag/inertia-toast-vue`
- React package: `@erag/inertia-toast-react`

## Key Laravel Entry Points

- Service provider: `src/InertiaToastServiceProvider.php`
- Middleware: `src/Middleware/ShareInertiaToastMiddleware.php`
- Facade: `src/Facades/InertiaToast.php`
- Helper: `src/LangHelpers.php`
- Loader: `src/Support/InertiaToastLoader.php`

## Current Package Behavior

- Toast payloads are shared with Inertia as `props.toast`
- Package middleware is registered automatically
- Users do not need to manually add package middleware
- Middleware is not tied to the `web` group

## Verification Commands

- PHP style: `vendor/bin/pint --dirty --format agent`
- Laravel tests from host app: `php artisan test --compact ...`
- Docs build: `cd docs && npm run build`

## Documentation Files

- Installation: `docs/docs/installation.md`
- Laravel usage: `docs/docs/laravel.md`
- Vue usage: `docs/docs/vue.md`
- React usage: `docs/docs/react.md`
- Modal usage: `docs/docs/modal-usage.md`
- Styling: `docs/docs/styling.md`
- API reference: `docs/docs/api-reference.md`
