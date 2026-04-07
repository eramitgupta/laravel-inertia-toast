import {
    createContext,
    useContext,
    useMemo,
    useSyncExternalStore,
    type Dispatch,
    type SetStateAction,
} from 'react';
import {
    getToastSnapshot,
    removeToast,
    setToastPosition,
    showToast,
    subscribeToastStore,
} from '../store/toastStore';
import type { ToastItem, ToastPosition, ToastType } from '../shared/types';

export interface ToastContextState {
    toasts: ToastItem[];
    position: ToastPosition;
}

export interface ToastContextValue {
    state: ToastContextState;
    remove: (id: ToastItem['id']) => void;
    setPosition: Dispatch<SetStateAction<ToastPosition>>;
    show: (
        type: ToastType,
        title: string,
        message: string,
        duration?: number,
        position?: ToastPosition,
    ) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);

    if (context) {
        return useMemo(
            () => ({
                state: context.state,
                show: context.show,
                remove: context.remove,
                setPosition: (position: ToastPosition) => {
                    context.setPosition(position);
                },
                success: (
                    message: string,
                    title: string = 'Success',
                    duration?: number,
                    position?: ToastPosition,
                ) =>
                    context.show('success', title, message, duration, position),
                error: (
                    message: string,
                    title: string = 'Error',
                    duration?: number,
                    position?: ToastPosition,
                ) => context.show('error', title, message, duration, position),
                warning: (
                    message: string,
                    title: string = 'Warning',
                    duration?: number,
                    position?: ToastPosition,
                ) =>
                    context.show('warning', title, message, duration, position),
                info: (
                    message: string,
                    title: string = 'Info',
                    duration?: number,
                    position?: ToastPosition,
                ) => context.show('info', title, message, duration, position),
            }),
            [context],
        );
    }

    const snapshot = useSyncExternalStore(
        subscribeToastStore,
        getToastSnapshot,
        getToastSnapshot,
    );

    return {
        state: snapshot,
        show: showToast,
        remove: removeToast,
        setPosition: setToastPosition,
        success: (
            message: string,
            title: string = 'Success',
            duration?: number,
            position?: ToastPosition,
        ) => showToast('success', title, message, duration, position),
        error: (
            message: string,
            title: string = 'Error',
            duration?: number,
            position?: ToastPosition,
        ) => showToast('error', title, message, duration, position),
        warning: (
            message: string,
            title: string = 'Warning',
            duration?: number,
            position?: ToastPosition,
        ) => showToast('warning', title, message, duration, position),
        info: (
            message: string,
            title: string = 'Info',
            duration?: number,
            position?: ToastPosition,
        ) => showToast('info', title, message, duration, position),
    };
};
