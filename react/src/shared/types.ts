export type ToastId = number | string;

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastItem {
  id: ToastId;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  position?: ToastPosition;
}

export interface PluginOptions {
  position?: ToastPosition;
}

export type ModalType = 'danger' | 'info' | 'warning' | 'success';

export interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ModalType;
  icon?: string;
}
