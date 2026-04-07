import { useEffect, useRef } from 'react';
import { useToast } from '../hooks/useToast';
import type { ToastItem, ToastPosition, ToastType } from '../shared/types';
import {
    DEFAULT_TOAST_DURATION,
    isToastPosition,
    isToastType,
    TOAST_DEFAULT_TITLES,
} from '../shared/toast';

type IncomingToast = {
    id?: unknown;
    type?: unknown;
    title?: unknown;
    message?: unknown;
    duration?: unknown;
    position?: unknown;
};

const normalizeToast = (value: unknown): ToastItem | null => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const toast = value as IncomingToast;

    if (!isToastType(toast.type) || typeof toast.message !== 'string') {
        return null;
    }

    const type = toast.type as ToastType;

    return {
        id:
            typeof toast.id === 'number' || typeof toast.id === 'string'
                ? toast.id
                : `${type}-${toast.message}`,
        type,
        title:
            typeof toast.title === 'string'
                ? toast.title
                : TOAST_DEFAULT_TITLES[type],
        message: toast.message,
        duration:
            typeof toast.duration === 'number'
                ? toast.duration
                : DEFAULT_TOAST_DURATION,
        position: isToastPosition(toast.position) ? toast.position : undefined,
    };
};

const getInitialPageToast = (): unknown => {
    const inertiaRoot = document.querySelector<HTMLElement>('[data-page]');

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

export default function FlashToastBridge() {
    const { show } = useToast();
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
