import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { func, string, bool } from 'prop-types';
import { Backdrop, Container } from './Modal.styled';
import BodyScrollLock from 'components/BodyScrollLock';
import { Transition } from 'react-transition-group';

const rootModal = document.querySelector('#root-modal');
const { addEventListener, removeEventListener } = window;

const TRANS_DURATION = 250;

const defaultStyle = {
  transition: `opacity ${TRANS_DURATION}ms ease`,
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
  useEffect(() => {
    const handleKeydown = ({ code }) =>
      code === 'Escape' && onClose && onClose();

    addEventListener('keydown', handleKeydown);

    return () => removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleBackdropClick = ({ currentTarget, target }) =>
    currentTarget === target && onClose && onClose();

  return createPortal(
    <Transition
      mountOnEnter
      unmountOnExit
      timeout={TRANS_DURATION}
      in={visible}
    >
      {state => (
        <Backdrop
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
};

export default Modal;
