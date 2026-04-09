import { createContext, useContext, useSyncExternalStore } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { TOAST_DEFAULT_TITLES } from '../shared/toast';
import type { ToastState } from '../shared/toastState';
import type { ToastItem, ToastPosition, ToastType } from '../shared/types';
import {
    getToastSnapshot,
    removeToast,
    setToastPosition,
    showToast,
    subscribeToastStore,
} from '../store/toastStore';

export type ToastContextState = ToastState;

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

type ToastApiSource = {
    state: ToastContextState;
    show: ToastContextValue['show'];
    remove: (id: ToastItem['id']) => void;
    setPosition: (position: ToastPosition) => void;
};

type ToastApiMethod = (
    message: string,
    title?: string,
    duration?: number,
    position?: ToastPosition,
) => void;

const createToastMethod = (
    source: ToastApiSource,
    type: ToastType,
): ToastApiMethod => {
    return (
        message,
        title = TOAST_DEFAULT_TITLES[type],
        duration,
        position,
    ) => {
        source.show(type, title, message, duration, position);
    };
};

const createToastApi = (source: ToastApiSource) => ({
    state: source.state,
    show: source.show,
    remove: source.remove,
    setPosition: source.setPosition,
    success: createToastMethod(source, 'success'),
    error: createToastMethod(source, 'error'),
    warning: createToastMethod(source, 'warning'),
    info: createToastMethod(source, 'info'),
});

export const useToast = () => {
    const context = useContext(ToastContext);
    const snapshot = useSyncExternalStore(
        subscribeToastStore,
        getToastSnapshot,
        getToastSnapshot,
    );

    if (context) {
        return createToastApi({
            state: context.state,
            show: context.show,
            remove: context.remove,
            setPosition: (position) => {
                context.setPosition(position);
            },
        });
    }

    return createToastApi({
        state: snapshot,
        show: showToast,
        remove: removeToast,
        setPosition: setToastPosition,
    });
};
