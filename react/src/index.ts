import { createElement } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import ConfirmationBox from './components/ConfirmationBox';
import FlashToastBridge from './components/FlashToastBridge';
import ToastContainer from './components/ToastContainer';
import type { PluginOptions } from './shared/types';
import { setToastPosition } from './store/toastStore';
import './shared/style.css';

const mountedRoots = new Map<string, Root>();
const standaloneComponents = [
  ['erag-toast-container', createElement(ToastContainer)],
  ['erag-modal-container', createElement(ConfirmationBox)],
  ['erag-toast-bridge', createElement(FlashToastBridge)],
] as const;

const mountStandaloneComponent = (id: string, component: ReactNode): void => {
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

export const initializeToast = (options: PluginOptions = {}): void => {
  standaloneComponents.forEach(([id, component]) => {
    mountStandaloneComponent(id, component);
  });

  if (options.position) {
    setToastPosition(options.position);
  }
};

export * from './shared/types';
export { useConfirmation } from './hooks/useConfirmation';
export { useToast } from './hooks/useToast';
export { default as ConfirmationBox } from './components/ConfirmationBox';
export { default as FlashToastBridge } from './components/FlashToastBridge';
export { default as InertiaToastProvider } from './components/InertiaToastProvider';
export { default as Toast } from './components/Toast';
export { default as ToastContainer } from './components/ToastContainer';
export default initializeToast;
