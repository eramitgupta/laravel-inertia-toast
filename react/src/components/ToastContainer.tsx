import { useToast } from '../hooks/useToast';
import Toast from './Toast';

export default function ToastContainer() {
    const { state } = useToast();

    return (
        <div className={`erag-toast-container erag-${state.position}`}>
            {state.toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
}
