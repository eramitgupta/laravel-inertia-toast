import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext, type ToastContextState } from '../hooks/useToast';
import {
    createToastItem,
    DEFAULT_TOAST_DURATION,
    DEFAULT_TOAST_POSITION,
} from '../shared/toast';
import type { PluginOptions } from '../shared/types';
import ConfirmationBox from './ConfirmationBox';
import FlashToastBridge from './FlashToastBridge';
import ToastContainer from './ToastContainer';

interface InertiaToastProviderProps extends PluginOptions {
    children: React.ReactNode;
}

const updatePositionState = (
    currentState: ToastContextState,
    position: ToastContextState['position'],
): ToastContextState => {
    if (currentState.position === position) {
        return currentState;
    }

    return {
        ...currentState,
        position,
    };
};

export default function InertiaToastProvider({
    children,
    position,
}: InertiaToastProviderProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [state, setState] = useState<ToastContextState>({
        toasts: [],
        position: position ?? DEFAULT_TOAST_POSITION,
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (position) {
            setState((currentState) =>
                updatePositionState(currentState, position),
            );
        }
    }, [position]);

    const remove = useCallback((id: number | string) => {
        setState((currentState) => ({
            ...currentState,
            toasts: currentState.toasts.filter((toast) => toast.id !== id),
        }));
    }, []);

    const show = useCallback(
        (
            type: 'success' | 'error' | 'warning' | 'info',
            title: string,
            message: string,
            duration: number = DEFAULT_TOAST_DURATION,
            nextPosition?: PluginOptions['position'],
        ) => {
            setState((currentState) => ({
                position: nextPosition ?? currentState.position,
                toasts: [
                    ...currentState.toasts,
                    createToastItem(
                        `${Date.now()}-${Math.random()}`,
                        type,
                        title,
                        message,
                        duration,
                        nextPosition,
                    ),
                ],
            }));
        },
        [],
    );

    const setPosition = useCallback(
        (value: React.SetStateAction<ToastContextState['position']>) => {
            setState((currentState) => {
                const nextPosition =
                    typeof value === 'function'
                        ? value(currentState.position)
                        : value;

                return updatePositionState(currentState, nextPosition);
            });
        },
        [],
    );

    const contextValue = useMemo(
        () => ({
            state,
            remove,
            setPosition,
            show,
        }),
        [remove, setPosition, show, state],
    );

    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
            </ToastContext.Provider>
            {isMounted
                ? createPortal(
                      <ToastContext.Provider value={contextValue}>
                          <>
                              <ToastContainer />
                              <ConfirmationBox />
                              <FlashToastBridge />
                          </>
                      </ToastContext.Provider>,
                      document.body,
                  )
                : null}
        </>
    );
}
