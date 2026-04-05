import type { ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import ConfirmationBox from './components/ConfirmationBox';
import FlashToastBridge from './components/FlashToastBridge';
import ToastContainer from './components/ToastContainer';
import { useConfirmation } from './hooks/useConfirmation';
import { useToast } from './hooks/useToast';
import { setToastPosition } from './store/toastStore';
import type { PluginOptions } from './types';
import './style.css';

export * from './types';
export { useToast, useConfirmation };

const mountedRoots = new Map<string, Root>();

const mountStandaloneComponent = (id: string, component: ReactNode) => {
    if (mountedRoots.has(id)) {
        return;
    }

    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(component);
    mountedRoots.set(id, root);
};

export const initializeToast = (options: PluginOptions = {}) => {
    mountStandaloneComponent('erag-toast-container', <ToastContainer />);
    mountStandaloneComponent('erag-modal-container', <ConfirmationBox />);
    mountStandaloneComponent('erag-toast-bridge', <FlashToastBridge />);

    if (options.position) {
        setToastPosition(options.position);
    }
};

export default initializeToast;
