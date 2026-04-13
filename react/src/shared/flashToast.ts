import {
  createToastItem,
  DEFAULT_TOAST_DURATION,
  isToastPosition,
  isToastType,
  TOAST_DEFAULT_TITLES,
} from './toast';
import type { ToastItem } from './types';

type IncomingToast = {
  id?: unknown;
  type?: unknown;
  title?: unknown;
  message?: unknown;
  duration?: unknown;
  position?: unknown;
};

export interface InertiaPageWithToast {
  props?: {
    toast?: unknown;
  };
}

export interface InertiaSuccessEventDetail {
  page?: InertiaPageWithToast;
}

export const normalizeIncomingToast = (value: unknown): ToastItem | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const toast = value as IncomingToast;

  if (!isToastType(toast.type) || typeof toast.message !== 'string') {
    return null;
  }

  return createToastItem(
    typeof toast.id === 'number' || typeof toast.id === 'string'
      ? toast.id
      : `${toast.type}-${toast.message}`,
    toast.type,
    typeof toast.title === 'string' ? toast.title : '',
    toast.message,
    typeof toast.duration === 'number' ? toast.duration : DEFAULT_TOAST_DURATION,
    isToastPosition(toast.position) ? toast.position : undefined,
  );
};

export const getInitialPageToast = (): unknown => {
  const inertiaRoot = document.querySelector<HTMLElement>('[data-page]');

  if (!inertiaRoot?.dataset.page) {
    return null;
  }

  try {
    return (JSON.parse(inertiaRoot.dataset.page) as InertiaPageWithToast).props?.toast;
  } catch {
    return null;
  }
};
