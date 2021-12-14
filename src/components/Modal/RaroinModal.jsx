import { makeStyles } from '@material-ui/styles';
import React from 'react';
import cx from 'classnames';

export function RaroinModal(props) {
  const {
    visible,
    id,
    title,
    children,
    onClose,
    submitDisabled,
    submitLabel,
    onSubmit,
  } = props;

  const styles = useStyle();

  return (
    <div
      className={cx(
        'modal fade popup',
        styles.container,
        visible && 'show',
        visible ? styles.visible : styles.hide
      )}
      id={id}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body space-y-20 p-40">
            {title && <h3>{title}</h3>}
            {children}
            {submitLabel && (
              <button
                href=""
                className={cx(
                  'btn btn-primary w-full rounded-10',
                  submitDisabled && styles.disabledSubmit
                )}
                onClick={onSubmit}
              >
                <strong>{submitLabel}</strong>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyle = makeStyles(() => ({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  visible: {
    display: 'block',
    paddingRight: '15px',
  },
  hide: {
    display: 'none',
  },
  disabledSubmit: {
    cursor: 'not-allowed',
    boxShadow: 'none !important',
    opacity: 0.7,
  },
}));
