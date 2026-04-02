<script setup lang="ts">
import type { GlobalEvent, Page } from '@inertiajs/core';
import { onBeforeUnmount, onMounted } from 'vue';
import { useToast } from '../composables/useToast';
import type { PageProps } from '../type/page';
import type { ToastType } from '../types';

type IncomingToast = {
    type?: unknown;
    title?: unknown;
    message?: unknown;
    duration?: unknown;
};

const toast = useToast();

const showToast = (maybeToast: unknown) => {
    if (!maybeToast || typeof maybeToast !== 'object') {
        return;
    }

    const t = maybeToast as IncomingToast;

    if (!t.type || !t.message || typeof t.type !== 'string' || typeof t.message !== 'string') {
        return;
    }

    const type = t.type as ToastType;

    if (!['success', 'error', 'warning', 'info'].includes(type)) {
        return;
    }

    const title = typeof t.title === 'string' ? t.title : t.type;
    const duration = typeof t.duration === 'number' ? t.duration : undefined;

    toast[type](t.message, title, duration);
};

const getInitialPageToast = () => {
    const inertiaRoot = document.querySelector<HTMLElement>('[data-page]');
    if (!inertiaRoot) {
        return null;
    }

    const rawPage = inertiaRoot.dataset.page;
    if (!rawPage) {
        return null;
    }

    try {
        const parsedPage = JSON.parse(rawPage) as Page<PageProps>;
        return parsedPage.props?.toast ?? null;
    } catch {
        return null;
    }
};

const onSuccess = (event: Event) => {
    const inertiaEvent = event as GlobalEvent<'success'>;
    showToast(inertiaEvent.detail.page.props?.toast);
};

onMounted(() => {
    showToast(getInitialPageToast());
    document.addEventListener('inertia:success', onSuccess);
});

onBeforeUnmount(() => {
    document.removeEventListener('inertia:success', onSuccess);
});
</script>
