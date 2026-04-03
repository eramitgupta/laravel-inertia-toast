import { defineConfig } from 'vitepress';

const githubRepo = 'laravel-inertia-toast';

export default defineConfig({
    base: `/${githubRepo}/`,
    title: 'Laravel Inertia Toast',
    description:
        'Toast notifications and confirmation dialogs for Laravel, Inertia.js, and Vue 3.',
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/installation' },
            { text: 'Laravel', link: '/laravel' },
            { text: 'Vue', link: '/vue' },
            { text: 'API', link: '/api-reference' },
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
                ],
            },
            {
                text: 'Reference',
                items: [{ text: 'API Reference', link: '/api-reference' }],
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
