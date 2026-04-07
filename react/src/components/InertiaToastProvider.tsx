import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext, type ToastContextState } from '../hooks/useToast';
import type { PluginOptions } from '../shared/types';
import ConfirmationBox from './ConfirmationBox';
import FlashToastBridge from './FlashToastBridge';
import ToastContainer from './ToastContainer';

interface InertiaToastProviderProps extends PluginOptions {
    children: React.ReactNode;
}

export default function InertiaToastProvider({
    children,
    position,
}: InertiaToastProviderProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [state, setState] = useState<ToastContextState>({
        toasts: [],
        position: position ?? 'bottom-right',
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (position) {
            setState((currentState) => ({
                ...currentState,
                position,
            }));
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
            duration: number = 4500,
            nextPosition?: PluginOptions['position'],
        ) => {
            setState((currentState) => ({
                position: nextPosition ?? currentState.position,
                toasts: [
                    ...currentState.toasts,
                    {
                        id: `${Date.now()}-${Math.random()}`,
                        type,
                        title,
                        message,
                        duration,
                        position: nextPosition,
                    },
                ],
            }));
        },
        [],
    );

    const contextValue = useMemo(
        () => ({
            state,
            remove,
            setPosition: (
                value: React.SetStateAction<ToastContextState['position']>,
            ) => {
                setState((currentState) => ({
                    ...currentState,
                    position:
                        typeof value === 'function'
                            ? value(currentState.position)
                            : value,
                }));
            },
            show,
        }),
        [remove, show, state],
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
