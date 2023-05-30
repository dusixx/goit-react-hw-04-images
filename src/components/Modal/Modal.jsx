import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { func, string, bool } from 'prop-types';
import { Backdrop, Container } from './Modal.styled';
import BodyScrollLock from 'components/BodyScrollLock';
import { Transition } from 'react-transition-group';

const rootModal = document.querySelector('#root-modal');

const TRANS_DURATION = 250;

const defaultStyle = {
  transitionProperty: `opacity`,
  transitionDuration: 'var(--trans-duration)',
  transitionTimingFunction: 'var(--trans-func)',
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
};

//
// Modal
//

const Modal = ({
  children,
  bgColor,
  onClose,
  bodyScrollLock = true,
  visible,
}) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleKeydown = ({ code }) =>
      code === 'Escape' && onClose && onClose();

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleBackdropClick = ({ currentTarget, target }) =>
    currentTarget === target && onClose && onClose();

  return createPortal(
    <Transition
      mountOnEnter
      unmountOnExit
      timeout={TRANS_DURATION}
      nodeRef={backdropRef}
      in={visible}
    >
      {state => (
        <Backdrop
          ref={backdropRef}
          onClick={handleBackdropClick}
          bgColor={bgColor}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {bodyScrollLock && <BodyScrollLock />}
          <Container>{children}</Container>
        </Backdrop>
      )}
    </Transition>,
    rootModal
  );
};

Modal.propTypes = {
  bgColor: string,
  onClose: func,
  bodyScrollLock: bool,
  visible: bool,
};

export default Modal;
