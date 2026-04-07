import { useEffect, useState } from 'react';
import { icons } from '../icons';
import type { ToastType } from '../types';

interface ToastProps {
    id: number;
    type: ToastType;
    title: string;
    message: string;
    duration: number;
    onClose: (id: number) => void;
}

export default function Toast({
    id,
    type,
    title,
    message,
    duration,
    onClose,
}: ToastProps) {
    const [isMounted, setIsMounted] = useState(false);

    const currentIcon = icons[type] || icons.info;
    const isSingleLine = !title?.trim() || !message?.trim();

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setIsMounted(true);
        });

        const timer = window.setTimeout(() => {
            onClose(id);
        }, duration);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timer);
        };
    }, [duration, id, onClose]);

    return (
        <div
            className={`erag-toast erag-${type}${isMounted ? 'erag-show' : ''}`}
            style={{ ['--duration' as string]: `${duration}ms` }}
        >
            <div
                className="erag-toast-icon"
                dangerouslySetInnerHTML={{ __html: currentIcon }}
            />

            <div
                className={`erag-toast-content${isSingleLine ? 'erag-single-line' : ''}`}
            >
                <strong>{title}</strong>
                <span>{message}</span>
            </div>

            <button
                type="button"
                className="erag-toast-close"
                onClick={() => onClose(id)}
            >
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                >
                    <path
                        fill="currentColor"
                        d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                    />
                </svg>
            </button>
        </div>
    );
}
