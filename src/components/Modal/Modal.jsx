import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { func, string, bool } from 'prop-types';
import { Backdrop, Container } from './Modal.styled';
import BodyScrollLock from 'components/BodyScrollLock';

const rootModal = document.querySelector('#root-modal');
const { addEventListener, removeEventListener } = window;

//
// Modal
//

const Modal = ({ children, bgColor, onClose, bodyScrollLock = true }) => {
  useEffect(() => {
    const handleKeydown = ({ code }) =>
      code === 'Escape' && onClose && onClose();

    addEventListener('keydown', handleKeydown);

    return () => removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleBackdropClick = ({ currentTarget, target }) =>
    currentTarget === target && onClose && onClose();

  return createPortal(
    <Backdrop onClick={handleBackdropClick} bgColor={bgColor}>
      {bodyScrollLock && <BodyScrollLock />}
      <Container>{children}</Container>
    </Backdrop>,
    rootModal
  );
};

Modal.propTypes = {
  bgColor: string,
  onClose: func,
  bodyScrollLock: bool,
};

export default Modal;
