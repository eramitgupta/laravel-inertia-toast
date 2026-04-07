import { defaultIcons } from '../shared/defaultIcons';
import type { ModalOptions, ModalType } from '../shared/types';

export interface ConfirmationState {
    isOpen: boolean;
    options: Required<Omit<ModalOptions, 'icon'>> & { icon?: string };
}

let state: ConfirmationState = {
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
    state = {
        isOpen: true,
        options: {
            ...state.options,
            ...options,
        },
    };
    notify();

    return new Promise((resolve) => {
        resolvePromise = resolve;
    });
};

export const handleConfirmationAction = (value: boolean) => {
    state = {
        ...state,
        isOpen: false,
    };

    notify();
    resolvePromise?.(value);
    resolvePromise = null;
};

export const getCurrentType = () =>
    typeConfig[state.options.type || ('info' as ModalType)];

export const getResolvedIcon = () =>
    state.options.icon
        ? state.options.icon
        : defaultIcons[state.options.type || ('info' as ModalType)];
