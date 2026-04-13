import { createToastItem, DEFAULT_TOAST_DURATION } from '../shared/toast';
import {
  appendToastToState,
  createToastState,
  removeToastFromState,
  updateToastStatePosition,
} from '../shared/toastState';
import type { ToastState } from '../shared/toastState';
import type { ToastId, ToastPosition, ToastType } from '../shared/types';

let state: ToastState = createToastState();

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
  const nextState = updateToastStatePosition(state, position);

  if (nextState === state) {
    return;
  }

  state = nextState;
  notify();
};

export const removeToast = (id: ToastId) => {
  const nextState = removeToastFromState(state, id);

  if (nextState === state) {
    return;
  }

  state = nextState;
  notify();
};

export const showToast = (
  type: ToastType,
  title: string,
  message: string,
  duration = DEFAULT_TOAST_DURATION,
  position?: ToastPosition,
) => {
  const id = count++;

  state = appendToastToState(state, createToastItem(id, type, title, message, duration, position));

  notify();
};
