import { useEffect, useRef } from 'react';
import { useToast } from '../hooks/useToast';
import { getInitialPageToast, normalizeIncomingToast } from '../shared/flashToast';
import type { InertiaSuccessEventDetail } from '../shared/flashToast';
import type { ToastItem } from '../shared/types';

export default function FlashToastBridge() {
  const { show } = useToast();
  const lastToastId = useRef<ToastItem['id'] | null>(null);

  useEffect(() => {
    const showIncomingToast = (value: unknown) => {
      const nextToast = normalizeIncomingToast(value);

      if (!nextToast || nextToast.id === lastToastId.current) {
        return;
      }

      lastToastId.current = nextToast.id;
      show(
        nextToast.type,
        nextToast.title,
        nextToast.message,
        nextToast.duration,
        nextToast.position,
      );
    };

    const handleSuccess = (event: Event) => {
      const detail = event as CustomEvent<InertiaSuccessEventDetail>;

      showIncomingToast(detail.detail.page?.props?.toast);
    };

    showIncomingToast(getInitialPageToast());
    document.addEventListener('inertia:success', handleSuccess);

    return () => {
      document.removeEventListener('inertia:success', handleSuccess);
    };
  }, [show]);

  return null;
}
