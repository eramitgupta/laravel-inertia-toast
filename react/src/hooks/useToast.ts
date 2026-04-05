import { useSyncExternalStore } from 'react';
import type { ToastPosition } from '../types';
import { getToastSnapshot, removeToast, setToastPosition, showToast, subscribeToastStore } from '../store/toastStore';

export const useToast = () => {
    const state = useSyncExternalStore(subscribeToastStore, getToastSnapshot, getToastSnapshot);

    return {
        state,
        show: showToast,
        remove: removeToast,
        setPosition: setToastPosition,
        success: (msg: string, title = 'Success', duration?: number, position?: ToastPosition) =>
            showToast('success', title, msg, duration, position),
        error: (msg: string, title = 'Error', duration?: number, position?: ToastPosition) =>
            showToast('error', title, msg, duration, position),
        warning: (msg: string, title = 'Warning', duration?: number, position?: ToastPosition) =>
            showToast('warning', title, msg, duration, position),
        info: (msg: string, title = 'Info', duration?: number, position?: ToastPosition) =>
            showToast('info', title, msg, duration, position),
    };
};
