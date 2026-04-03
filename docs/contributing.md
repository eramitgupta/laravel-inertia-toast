---
title: Contributing Guide
description: Learn how to contribute to Laravel Inertia Toast, including docs workflow, pull request guidelines, local development, and package contribution notes.
head:
  - - meta
    - name: description
      content: Learn how to contribute to Laravel Inertia Toast, including docs workflow, pull request guidelines, local development, and package contribution notes.
---

# Contributing

Thank you for considering contributing to Laravel Inertia Toast.

## How You Can Help

- improve the documentation
- fix examples, wording, and usage notes
- report or clarify Laravel integration issues
- suggest Vue API improvements
- propose package features and bug fixes

## Repository Scope

This branch is focused on the documentation site and published docs assets.

In this branch you can contribute:

- VitePress documentation pages in `docs`
- navigation, theme, and styling inside `docs/.vitepress`
- examples and contributor-facing documentation

If you want to contribute to Laravel or Vue package behavior, open a pull request with:

- a clear explanation of the change
- documentation updates for the new behavior
- focused examples showing the expected usage

## Local Development

Install dependencies:

```bash
npm install
```

Run the docs site:

```bash
npm run dev
```

Build the docs site:

```bash
npm run build
```

If your change also includes PHP package updates in a branch that contains Composer scripts, run:

```bash
composer lint
```

## Recommended Flow

1. Fork the repository.
2. Create a small, focused branch.
3. Make one clear improvement at a time.
4. Run `npm run build` before opening your pull request.
5. Explain what changed, why it changed, and which docs pages were updated.

## Contribution Guidelines

- keep pull requests small and reviewable
- preserve the existing Laravel-style documentation tone
- update relevant docs when behavior, API, or setup changes
- prefer practical examples over long theory
- avoid unrelated formatting-only changes in the same pull request

## Useful Links

- Docs home: [https://eramitgupta.github.io/laravel-inertia-toast/](https://eramitgupta.github.io/laravel-inertia-toast/)
- Installation: [https://eramitgupta.github.io/laravel-inertia-toast/installation](https://eramitgupta.github.io/laravel-inertia-toast/installation)
- Laravel guide: [https://eramitgupta.github.io/laravel-inertia-toast/laravel](https://eramitgupta.github.io/laravel-inertia-toast/laravel)
- Vue guide: [https://eramitgupta.github.io/laravel-inertia-toast/vue](https://eramitgupta.github.io/laravel-inertia-toast/vue)
