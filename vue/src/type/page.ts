import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import { ToastItem } from '../types';

export interface PageProps extends InertiaPageProps {
    toast?: ToastItem | null;
}
