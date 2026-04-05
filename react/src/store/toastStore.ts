import type { ToastItem, ToastPosition, ToastType } from '../types';

export interface ToastState {
    toasts: ToastItem[];
    position: ToastPosition;
}

const state: ToastState = {
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
    state.position = position;
    notify();
};

export const removeToast = (id: number) => {
    const index = state.toasts.findIndex((toast) => toast.id === id);

    if (index !== -1) {
        state.toasts.splice(index, 1);
        notify();
    }
};

export const showToast = (
    type: ToastType,
    title: string,
    message: string,
    duration = 4500,
    position?: ToastPosition
) => {
    const id = count++;

    if (position) {
        state.position = position;
    }

    state.toasts.push({
        id,
        type,
        title,
        message,
        duration,
    });

    notify();

    if (duration > 0) {
        setTimeout(() => {
            removeToast(id);
        }, duration + 500);
    }
};
