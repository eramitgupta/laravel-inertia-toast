import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from '../hooks/useToast';
import type { ToastContextState } from '../hooks/useToast';
import { createToastItem, DEFAULT_TOAST_DURATION } from '../shared/toast';
import {
  appendToastToState,
  createToastState,
  removeToastFromState,
  updateToastStatePosition,
} from '../shared/toastState';
import type { PluginOptions } from '../shared/types';
import ConfirmationBox from './ConfirmationBox';
import FlashToastBridge from './FlashToastBridge';
import ToastContainer from './ToastContainer';

interface InertiaToastProviderProps extends PluginOptions {
  children: React.ReactNode;
}

export default function InertiaToastProvider({ children, position }: InertiaToastProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<ToastContextState>(() => createToastState(position));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (position) {
      setState((currentState) => updateToastStatePosition(currentState, position));
    }
  }, [position]);

  const remove = useCallback((id: number | string) => {
    setState((currentState) => removeToastFromState(currentState, id));
  }, []);

  const show = useCallback(
    (
      type: 'success' | 'error' | 'warning' | 'info',
      title: string,
      message: string,
      duration: number = DEFAULT_TOAST_DURATION,
      nextPosition?: PluginOptions['position'],
    ) => {
      setState((currentState) =>
        appendToastToState(
          currentState,
          createToastItem(
            `${Date.now()}-${Math.random()}`,
            type,
            title,
            message,
            duration,
            nextPosition,
          ),
        ),
      );
    },
    [],
  );

  const setPosition = useCallback((value: React.SetStateAction<ToastContextState['position']>) => {
    setState((currentState) => {
      const nextPosition = typeof value === 'function' ? value(currentState.position) : value;

      return updateToastStatePosition(currentState, nextPosition);
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      remove,
      setPosition,
      show,
    }),
    [remove, setPosition, show, state],
  );
  const portalContent = (
    <ToastContext.Provider value={contextValue}>
      <>
        <ToastContainer />
        <ConfirmationBox />
        <FlashToastBridge />
      </>
    </ToastContext.Provider>
  );

  return (
    <>
      <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
      {isMounted ? createPortal(portalContent, document.body) : null}
    </>
  );
}
