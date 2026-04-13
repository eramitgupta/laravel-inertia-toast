import { useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { icons } from '../shared/icons';
import type { ToastId, ToastType } from '../shared/types';

interface ToastProps {
  id: ToastId;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
}

export default function Toast({ id, type, title, message, duration }: ToastProps) {
  const { remove } = useToast();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      remove(id);
    }, duration);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [duration, id, remove]);

  const isSingleLine = !title.trim() || !message.trim();
  const contentClassName = ['erag-toast-content', isSingleLine ? 'erag-single-line' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`erag-toast erag-${type} erag-show`}
      style={{ ['--duration' as string]: `${duration}ms` }}
    >
      <div
        className="erag-toast-icon"
        dangerouslySetInnerHTML={{ __html: icons[type] ?? icons.info }}
      />

      <div className={contentClassName}>
        <strong>{title}</strong>
        <span>{message}</span>
      </div>

      <button
        type="button"
        className="erag-toast-close"
        onClick={() => {
          remove(id);
        }}
      >
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path
            fill="currentColor"
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </button>
    </div>
  );
}
