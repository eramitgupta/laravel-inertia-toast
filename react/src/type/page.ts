import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { ToastItem } from '../types';

export interface PageProps extends InertiaPageProps {
    toast?: ToastItem | null;
}
