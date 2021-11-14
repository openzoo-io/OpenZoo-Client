import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  onShare: PropTypes.func,
};

export function ShareButton(props) {
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

  const handleOnClickShare = () => {
    if (props.visible == null) {
      setVisible(previousValue => !previousValue);
    }
    props.onClick?.();
  };

  const handleOnShare = social => () => {
    props.onShare?.(social);
  };

  return (
    <div className="share" ref={wrapperRef}>
      <div className="cursor-pointer icon" onClick={handleOnClickShare}>
        <i className="ri-share-line"></i>
      </div>
      <div
        className={cx(
          'dropdown__popup',
          props.visible || (visible && 'visible')
        )}
      >
        <ul className="space-y-10">
          <li>
            <div className="cursor-pointer" onClick={handleOnShare('facebook')}>
              <i className="ri-facebook-line"></i>
            </div>
          </li>
          <li>
            <div
              className="cursor-pointer"
              onClick={handleOnShare('messenger')}
            >
              <i className="ri-messenger-line"></i>
            </div>
          </li>
          <li>
            <div className="cursor-pointer" onClick={handleOnShare('whatapp')}>
              <i className="ri-whatsapp-line"></i>
            </div>
          </li>
          <li>
            <div className="cursor-pointer" onClick={handleOnShare('youtube')}>
              <i className="ri-youtube-line"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

ShareButton.propTypes = propTypes;
