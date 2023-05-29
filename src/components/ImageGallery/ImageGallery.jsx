import { arrayOf, object } from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { List, ListItem } from './ImageGallery.styled';

// id с бекенда не всегда уникальны (повтор изображений)
// коллекция статична - берем в качестве id число
let id = 0;

const ImageGallery = ({ hits, style }) => (
  <List style={style}>
    {hits.map(({ webformatURL, largeImageURL, tags }) => (
      <ListItem key={id++}>
        <ImageGalleryItem
          url={largeImageURL}
          tags={tags}
          preview={webformatURL}
        />
      </ListItem>
    ))}
  </List>
);

ImageGallery.propTypes = {
  hits: arrayOf(object),
};

export default ImageGallery;
