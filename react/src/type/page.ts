import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { ToastItem } from '../shared/types';

export interface PageProps extends InertiaPageProps {
    toast?: ToastItem | null;
}
