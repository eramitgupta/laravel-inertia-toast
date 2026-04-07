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
    const snapshot = useSyncExternalStore(
        subscribeConfirmationStore,
        getConfirmationSnapshot,
        getConfirmationSnapshot,
    );

    return {
        state: snapshot,
        confirm: confirmAction,
        handleAction: handleConfirmationAction,
        currentType: getCurrentType(),
        resolvedIcon: getResolvedIcon(),
    };
};
