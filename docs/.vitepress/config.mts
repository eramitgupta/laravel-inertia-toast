import { defineConfig } from 'vitepress';

export default defineConfig({
    base: '/laravel-inertia-toast/',
    lang: 'en-US',
    title: 'Laravel Inertia Toast Docs',
    description:
        'Laravel Inertia Toast documentation for toast notifications and confirmation dialogs with Laravel, Inertia.js, and Vue 3.',
    cleanUrls: true,
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: 'https://avatars.githubusercontent.com/u/72160684?v=4&size=64',
            },
        ],
        ['link', { rel: 'canonical', href: '' }],
        ['meta', { name: 'theme-color', content: '#f24e1e' }],
        ['meta', { name: 'author', content: 'Er Amit Gupta' }],
        [
            'meta',
            {
                name: 'keywords',
                content:
                    'Laravel Inertia Toast, Laravel toast notifications, Inertia.js toast, Vue 3 toast plugin, Laravel confirmation dialog',
            },
        ],
        ['meta', { property: 'og:type', content: 'website' }],
        [
            'meta',
            { property: 'og:site_name', content: 'Laravel Inertia Toast' },
        ],
        [
            'meta',
            { property: 'og:title', content: 'Laravel Inertia Toast Docs' },
        ],
        [
            'meta',
            {
                property: 'og:description',
                content:
                    'Documentation for Laravel Inertia Toast, a package for toast notifications and confirmation dialogs in Laravel, Inertia.js, and Vue 3.',
            },
        ],
        ['meta', { property: 'og:url', content: '' }],
        [
            'meta',
            {
                property: 'og:image',
                content:
                    'https://avatars.githubusercontent.com/u/72160684?v=4&size=64',
            },
        ],
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:creator', content: '@_eramitgupta' }],
        [
            'meta',
            { name: 'twitter:title', content: 'Laravel Inertia Toast Docs' },
        ],
        [
            'meta',
            {
                name: 'twitter:description',
                content:
                    'Toast notifications and confirmation dialogs for Laravel, Inertia.js, and Vue 3.',
            },
        ],
        [
            'meta',
            {
                name: 'twitter:image',
                content:
                    'https://avatars.githubusercontent.com/u/72160684?v=4&size=64',
            },
        ],
    ],
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/installation' },
            { text: 'Laravel', link: '/laravel' },
            { text: 'Vue', link: '/vue' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Overview', link: '/' },
                    { text: 'Installation', link: '/installation' },
                ],
            },
            {
                text: 'Usage',
                items: [
                    { text: 'Laravel Usage', link: '/laravel' },
                    { text: 'Vue Usage', link: '/vue' },
                    { text: 'Styling', link: '/styling' },
                ],
            },
            {
                text: 'Reference',
                items: [
                    { text: 'API Reference', link: '/api-reference' },
                    { text: 'Contributing', link: '/contributing' },
                ],
            },
        ],
        outline: {
            level: [2, 3],
            label: 'On this page',
        },
        search: {
            provider: 'local',
        },
        footer: {
            message: 'MIT License. Copyright Er Amit Gupta',
        },
    },
});
