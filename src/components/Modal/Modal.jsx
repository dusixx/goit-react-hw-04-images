import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { func, string } from 'prop-types';
import { Backdrop, Container } from './Modal.styled';
import ScrollToggler from './scrollToggler';

const scroll = new ScrollToggler();
const rootModal = document.querySelector('#root-modal');

//
// Modal
//

const Modal = ({ children, bgColor, onClose }) => {
  useEffect(() => {
    const handleKeydown = ({ code }) =>
      code === 'Escape' && onClose && onClose();

    scroll.disable();
    window.addEventListener('keydown', handleKeydown);

    return () => {
      scroll.enable();
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = ({ currentTarget, target }) =>
    currentTarget === target && onClose && onClose();

  return createPortal(
    <Backdrop onClick={handleBackdropClick} bgColor={bgColor}>
      <Container>{children}</Container>
    </Backdrop>,
    rootModal
  );
};

Modal.propTypes = {
  bgColor: string,
  onClose: func,
};

export default Modal;
