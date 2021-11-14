import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ReportModal } from './ReportModal';

const propTypes = {
  visible: PropTypes.bool,
  withModal: PropTypes.bool,
  onClick: PropTypes.func,
};

export function ReportButton(props) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
        setVisible(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleOnClick = () => {
    if (props.visible == null) {
      setVisible(previousValue => !previousValue);
    }
    props.onClick?.();
  };

  return (
    <>
      <div className="more" ref={wrapperRef}>
        <button className="cursor-pointer icon" onClick={handleOnClick}>
          <i className="ri-more-fill"></i>
        </button>
        <div
          className={cx(
            'dropdown__popup',
            props.visible || (visible && 'visible')
          )}
        >
          <ul className="space-y-10">
            <li>
              <div
                className="cursor-pointer space-x-10 d-flex"
                data-toggle="modal"
                data-target="#popup_report"
              >
                <i className="ri-flag-line"></i>
                <span> Report</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {props.withModal && <ReportModal />}
    </>
  );
}

ReportButton.propTypes = propTypes;
ReportButton.defaultProps = {
  withModal: true,
};
