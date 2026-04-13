import type { ToastId, ToastItem, ToastPosition, ToastType } from './types';

export const DEFAULT_TOAST_DURATION = 4500;
export const DEFAULT_TOAST_POSITION: ToastPosition = 'bottom-right';

export const TOAST_TYPES = ['success', 'error', 'warning', 'info'] as const;
export const TOAST_POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

export const TOAST_DEFAULT_TITLES: Record<ToastType, string> = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
};

export const isToastType = (value: unknown): value is ToastType => {
  return TOAST_TYPES.includes(value as ToastType);
};

export const isToastPosition = (value: unknown): value is ToastPosition => {
  return TOAST_POSITIONS.includes(value as ToastPosition);
};

export const createToastItem = (
  id: ToastId,
  type: ToastType,
  title: string,
  message: string,
  duration = DEFAULT_TOAST_DURATION,
  position?: ToastPosition,
): ToastItem => ({
  id,
  type,
  title,
  message,
  duration,
  position,
});
