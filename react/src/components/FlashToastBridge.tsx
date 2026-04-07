import type { GlobalEvent, Page } from '@inertiajs/core';
import { useEffect } from 'react';
import { showToast } from '../store/toastStore';
import type { PageProps } from '../type/page';
import type { ToastPosition, ToastType } from '../types';

type IncomingToast = {
    type?: unknown;
    title?: unknown;
    message?: unknown;
    duration?: unknown;
    position?: unknown;
};

const validToastTypes = new Set<ToastType>([
    'success',
    'error',
    'warning',
    'info',
]);

const validToastPositions = new Set<ToastPosition>([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
]);

export default function FlashToastBridge() {
    useEffect(() => {
        const showIncomingToast = (maybeToast: unknown) => {
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

            if (!validToastTypes.has(type)) {
                return;
            }

            const title =
                typeof incoming.title === 'string'
                    ? incoming.title
                    : incoming.type;
            const duration =
                typeof incoming.duration === 'number'
                    ? incoming.duration
                    : undefined;
            const position =
                typeof incoming.position === 'string' &&
                validToastPositions.has(incoming.position as ToastPosition)
                    ? (incoming.position as ToastPosition)
                    : undefined;

            showToast(type, title, incoming.message, duration, position);
        };

        const getInitialPageToast = () => {
            const inertiaRoot =
                document.querySelector<HTMLElement>('[data-page]');

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
            showIncomingToast(inertiaEvent.detail.page.props?.toast);
        };

        showIncomingToast(getInitialPageToast());
        document.addEventListener('inertia:success', onSuccess);

        return () => {
            document.removeEventListener('inertia:success', onSuccess);
        };
    }, []);

    return null;
}
