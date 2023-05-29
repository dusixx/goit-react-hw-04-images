import { Component } from 'react';
import { string } from 'prop-types';
import Modal from 'components/Modal';
import {
  Link,
  Image,
  Thumb,
  Overlay,
  Container,
} from './ImageGalleryItem.styled';
import { Spinner } from 'components/Loader';

const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.7)';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    url: string,
    tags: string,
    preview: string,
  };

  state = { showModal: false, wasLoaded: false };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleImageClick = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  handleModalImgLoaded = () => this.setState({ wasLoaded: true });

  render() {
    const { handleImageClick, handleModalClose, handleModalImgLoaded } = this;
    const { url, tags, preview } = this.props;
    const { showModal, wasLoaded } = this.state;

    return (
      <>
        <Link href={url} onClick={handleImageClick}>
          <Image src={preview} alt={tags} loading="lazy" />
        </Link>

        {showModal && (
          <Modal onClose={handleModalClose} bgColor={COLOR_MODAL_BG}>
            <Container>
              <Spinner width={40} visible={!wasLoaded} />
              <Thumb>
                <img src={url} alt={tags} onLoad={handleModalImgLoaded} />
                {wasLoaded && <Overlay>{tags}</Overlay>}
              </Thumb>
            </Container>
          </Modal>
        )}
      </>
    );
  }
}
