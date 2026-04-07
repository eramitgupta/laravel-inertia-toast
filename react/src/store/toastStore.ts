import type {
    ToastId,
    ToastItem,
    ToastPosition,
    ToastType,
} from '../shared/types';

export interface ToastState {
    toasts: ToastItem[];
    position: ToastPosition;
}

let state: ToastState = {
    toasts: [],
    position: 'bottom-right',
};

const subscribers = new Set<() => void>();

let count = 0;

const notify = () => {
    subscribers.forEach((listener) => listener());
};

export const subscribeToastStore = (listener: () => void) => {
    subscribers.add(listener);

    return () => {
        subscribers.delete(listener);
    };
};

export const getToastSnapshot = () => state;

export const setToastPosition = (position: ToastPosition) => {
    if (state.position === position) {
        return;
    }

    state = {
        ...state,
        position,
    };

    notify();
};

export const removeToast = (id: ToastId) => {
    const nextToasts = state.toasts.filter((toast) => toast.id !== id);

    if (nextToasts.length === state.toasts.length) {
        return;
    }

    state = {
        ...state,
        toasts: nextToasts,
    };

    notify();
};

export const showToast = (
    type: ToastType,
    title: string,
    message: string,
    duration = 4500,
    position?: ToastPosition,
) => {
    const id = count++;

    state = {
        ...state,
        position: position ?? state.position,
        toasts: [
            ...state.toasts,
            {
                id,
                type,
                title,
                message,
                duration,
                position,
            },
        ],
    };

    notify();
};
