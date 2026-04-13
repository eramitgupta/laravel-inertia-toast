import { useConfirmation } from '../hooks/useConfirmation';

export default function ConfirmationBox() {
  const { state, handleAction, currentType, resolvedIcon } = useConfirmation();

  if (!state.isOpen) {
    return null;
  }

  return (
    <div className="erag-modal-backdrop">
      <div className="erag-modal-container">
        <div className="erag-modal-body">
          {resolvedIcon ? (
            <div
              className={`erag-modal-icon-wrapper erag-${currentType.iconClass}`}
              dangerouslySetInnerHTML={{ __html: resolvedIcon }}
            />
          ) : null}

          <div className="erag-modal-text">
            <h3 className="erag-modal-title">{state.options.title}</h3>
            <p className="erag-modal-message">{state.options.message}</p>
          </div>
        </div>

        <div className="erag-modal-footer">
          <button
            type="button"
            className="erag-btn erag-btn-cancel"
            onClick={() => {
              handleAction(false);
            }}
          >
            {state.options.cancelText}
          </button>

          <button
            type="button"
            className={`erag-btn erag-btn-${currentType.confirmClass}`}
            onClick={() => {
              handleAction(true);
            }}
          >
            {state.options.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
