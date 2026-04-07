import { useSyncExternalStore } from 'react';
import {
    confirmAction,
    getConfirmationSnapshot,
    getCurrentType,
    getResolvedIcon,
    handleConfirmationAction,
    subscribeConfirmationStore,
} from '../store/confirmationStore';

export const useConfirmation = () => {
    const state = useSyncExternalStore(
        subscribeConfirmationStore,
        getConfirmationSnapshot,
        getConfirmationSnapshot,
    );

    return {
        state,
        confirm: confirmAction,
        handleAction: handleConfirmationAction,
        currentType: getCurrentType(),
        resolvedIcon: getResolvedIcon(),
    };
};
