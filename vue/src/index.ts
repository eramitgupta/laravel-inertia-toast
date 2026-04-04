import type { App, Plugin } from 'vue';
import { createVNode, render } from 'vue';
import ConfirmationBox from './components/ConfirmationBox.vue';
import FlashToastBridge from './components/FlashToastBridge.vue';
import ToastContainer from './components/ToastContainer.vue';
import { useConfirmation } from './composables/useConfirmation';
import { useToast } from './composables/useToast';
import type { PluginOptions } from './types';

export * from './types';
export { useToast, useConfirmation };

const ToastPlugin: Plugin = {
    install(app: App, options: PluginOptions = {}) {
        const mountStandaloneComponent = (id: string, component: object) => {
            if (document.getElementById(id)) {
                return;
            }

            const container = document.createElement('div');
            container.id = id;
            document.body.appendChild(container);

            const vnode = createVNode(component);
            vnode.appContext = app._context;
            render(vnode, container);
        };

        // 1. Set up Toast Container
        mountStandaloneComponent('erag-toast-container', ToastContainer);

        // 2. Set up Modal Container
        mountStandaloneComponent('erag-modal-container', ConfirmationBox);

        // 3. Render flash bridge (listens for Inertia page toast prop)
        mountStandaloneComponent('erag-toast-bridge', FlashToastBridge);

        // 4. Set the default position
        if (options.position) {
            const { setPosition } = useToast();
            setPosition(options.position);
        }

        app.config.globalProperties.$toast = useToast();
    }
};

export default ToastPlugin;
