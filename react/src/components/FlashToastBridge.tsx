import { useEffect, useRef } from 'react';
import { useToast } from '../hooks/useToast';
import type { ToastItem, ToastPosition, ToastType } from '../shared/types';

type IncomingToast = {
    id?: unknown;
    type?: unknown;
    title?: unknown;
    message?: unknown;
    duration?: unknown;
    position?: unknown;
};

const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
];

const types: ToastType[] = ['success', 'error', 'warning', 'info'];

const normalizeToast = (value: unknown): ToastItem | null => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const toast = value as IncomingToast;

    if (
        !types.includes(toast.type as ToastType) ||
        typeof toast.message !== 'string'
    ) {
        return null;
    }

    return {
        id:
            typeof toast.id === 'number' || typeof toast.id === 'string'
                ? toast.id
                : `${toast.type}-${toast.message}`,
        type: toast.type as ToastType,
        title:
            typeof toast.title === 'string'
                ? toast.title
                : (toast.type as ToastType),
        message: toast.message,
        duration: typeof toast.duration === 'number' ? toast.duration : 3000,
        position: positions.includes(toast.position as ToastPosition)
            ? (toast.position as ToastPosition)
            : undefined,
    };
};

export default function FlashToastBridge() {
    const toast = useToast();
    const { show } = toast;
    const lastToastId = useRef<ToastItem['id'] | null>(null);

    useEffect(() => {
        const showIncomingToast = (value: unknown) => {
            const nextToast = normalizeToast(value);

            if (!nextToast || nextToast.id === lastToastId.current) {
                return;
            }

            lastToastId.current = nextToast.id;
            show(
                nextToast.type,
                nextToast.title,
                nextToast.message,
                nextToast.duration,
                nextToast.position,
            );
        };

        const getInitialPageToast = (): unknown => {
            const inertiaRoot =
                document.querySelector<HTMLElement>('[data-page]');

            if (!inertiaRoot?.dataset.page) {
                return null;
            }

            try {
                return (
                    JSON.parse(inertiaRoot.dataset.page) as {
                        props?: { toast?: unknown };
                    }
                ).props?.toast;
            } catch {
                return null;
            }
        };

        const handleSuccess = (event: Event) => {
            const detail = event as CustomEvent<{
                page?: {
                    props?: {
                        toast?: unknown;
                    };
                };
            }>;

            showIncomingToast(detail.detail.page?.props?.toast);
        };

        showIncomingToast(getInitialPageToast());
        document.addEventListener('inertia:success', handleSuccess);

        return () => {
            document.removeEventListener('inertia:success', handleSuccess);
        };
    }, [show]);

    return null;
}
