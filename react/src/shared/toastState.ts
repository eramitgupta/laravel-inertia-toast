import { DEFAULT_TOAST_POSITION } from './toast';
import type { ToastId, ToastItem, ToastPosition } from './types';

export interface ToastState {
    toasts: ToastItem[];
    position: ToastPosition;
}

export const createToastState = (
    position: ToastPosition = DEFAULT_TOAST_POSITION,
): ToastState => ({
    toasts: [],
    position,
});

export const updateToastStatePosition = (
    state: ToastState,
    position: ToastPosition,
): ToastState => {
    if (state.position === position) {
        return state;
    }

    return {
        ...state,
        position,
    };
};

export const appendToastToState = (
    state: ToastState,
    toast: ToastItem,
): ToastState => ({
    position: toast.position ?? state.position,
    toasts: [...state.toasts, toast],
});

export const removeToastFromState = (
    state: ToastState,
    id: ToastId,
): ToastState => {
    const nextToasts = state.toasts.filter((toast) => toast.id !== id);

    if (nextToasts.length === state.toasts.length) {
        return state;
    }

    return {
        ...state,
        toasts: nextToasts,
    };
};
