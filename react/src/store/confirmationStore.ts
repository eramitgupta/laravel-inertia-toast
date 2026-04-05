import { defaultIcons } from '../constants/defaultIcons';
import type { ModalOptions, ModalType } from '../types';

export interface ConfirmationState {
    isOpen: boolean;
    options: Required<Omit<ModalOptions, 'icon'>> & { icon?: string };
}

const state: ConfirmationState = {
    isOpen: false,
    options: {
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'info',
        icon: undefined,
    },
};

const subscribers = new Set<() => void>();
let resolvePromise: ((value: boolean) => void) | null = null;

const typeConfig = {
    info: {
        icon: 'info',
        iconClass: 'info',
        confirmClass: 'info',
    },
    success: {
        icon: 'success',
        iconClass: 'success',
        confirmClass: 'success',
    },
    warning: {
        icon: 'warning',
        iconClass: 'warning',
        confirmClass: 'warning',
    },
    danger: {
        icon: 'danger',
        iconClass: 'danger',
        confirmClass: 'danger',
    },
} as const;

const notify = () => {
    subscribers.forEach((listener) => listener());
};

export const subscribeConfirmationStore = (listener: () => void) => {
    subscribers.add(listener);

    return () => {
        subscribers.delete(listener);
    };
};

export const getConfirmationSnapshot = () => state;

export const confirmAction = (options: ModalOptions): Promise<boolean> => {
    state.options = {
        ...state.options,
        ...options,
    };

    state.isOpen = true;
    notify();

    return new Promise((resolve) => {
        resolvePromise = resolve;
    });
};

export const handleConfirmationAction = (value: boolean) => {
    state.isOpen = false;
    notify();
    resolvePromise?.(value);
    resolvePromise = null;
};

export const getCurrentType = () => typeConfig[state.options.type || ('info' as ModalType)];

export const getResolvedIcon = () =>
    state.options.icon ? state.options.icon : defaultIcons[state.options.type || ('info' as ModalType)];
