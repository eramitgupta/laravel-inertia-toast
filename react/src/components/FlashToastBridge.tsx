import type { GlobalEvent, Page } from '@inertiajs/core';
import { useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import type { PageProps } from '../type/page';
import type { ToastPosition, ToastType } from '../types';

type IncomingToast = {
    type?: unknown;
    title?: unknown;
    message?: unknown;
    duration?: unknown;
    position?: unknown;
};

export default function FlashToastBridge() {
    const toast = useToast();

    useEffect(() => {
        const showToast = (maybeToast: unknown) => {
            if (!maybeToast || typeof maybeToast !== 'object') {
                return;
            }

            const incoming = maybeToast as IncomingToast;

            if (
                !incoming.type ||
                !incoming.message ||
                typeof incoming.type !== 'string' ||
                typeof incoming.message !== 'string'
            ) {
                return;
            }

            const type = incoming.type as ToastType;

            if (!['success', 'error', 'warning', 'info'].includes(type)) {
                return;
            }

            const title = typeof incoming.title === 'string' ? incoming.title : incoming.type;
            const duration = typeof incoming.duration === 'number' ? incoming.duration : undefined;
            const position =
                typeof incoming.position === 'string' &&
                [
                    'top-left',
                    'top-center',
                    'top-right',
                    'bottom-left',
                    'bottom-center',
                    'bottom-right',
                ].includes(incoming.position)
                    ? (incoming.position as ToastPosition)
                    : undefined;

            toast[type](incoming.message, title, duration, position);
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

        showToast(getInitialPageToast());
        document.addEventListener('inertia:success', onSuccess);

        return () => {
            document.removeEventListener('inertia:success', onSuccess);
        };
    }, [toast]);

    return null;
}
