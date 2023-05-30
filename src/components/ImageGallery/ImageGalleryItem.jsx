import { useState } from 'react';
import { string } from 'prop-types';
import Modal from 'components/Modal';
import { Spinner } from 'components/Loader';

import {
  Link,
  Image,
  Thumb,
  Overlay,
  Container,
} from './ImageGalleryItem.styled';

const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.7)';

export const ImageGalleryItem = ({ url, tags, preview }) => {
  const [showModal, setShowModal] = useState(false);
  const [wasLoaded, setWasLoaded] = useState(false);

  const handleImageClick = e => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Link href={url} onClick={handleImageClick}>
        <Image src={preview} alt={tags} loading="lazy" />
      </Link>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} bgColor={COLOR_MODAL_BG}>
          <Container>
            <Spinner width={40} visible={!wasLoaded} />
            <Thumb>
              <img src={url} alt={tags} onLoad={() => setWasLoaded(true)} />
              {wasLoaded && <Overlay>{tags}</Overlay>}
            </Thumb>
          </Container>
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: string.isRequired,
  tags: string.isRequired,
  preview: string.isRequired,
};
