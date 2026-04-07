import Toast from './Toast';
import { useToast } from '../hooks/useToast';

export default function ToastContainer() {
    const { state } = useToast();

    return (
        <div className={`erag-toast-container erag-${state.position}`}>
            {state.toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    type={toast.type}
                    title={toast.title}
                    message={toast.message}
                    duration={toast.duration}
                />
            ))}
        </div>
    );
}
