import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Button } from './App.styled';
import { initialQueryParams, message, status, pixabayService } from './data';
import Searchbar from 'components/Searchbar';
import MemoizedImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';

const { IDLE, REJECTED, RESOLVED, PENDING } = status;

//
// App
//

export const App = () => {
  const [status, setStatus] = useState(IDLE);
  const [hits, setHits] = useState([]);

  useEffect(() => {
    switch (status) {
      case IDLE:
      default:
        return;

      case REJECTED:
        return setStatus(IDLE);

      case RESOLVED:
        if (pixabayService.isEOSReached) {
          setStatus(IDLE);
          if (hits.length) toast.info(message.EOS_REACHED);
          else toast.warn(message.NO_SEARCH_RESULT);
        }
    }
  }, [status, hits]);

  const fetchImages = async params => {
    try {
      setStatus(PENDING);
      const resp = await pixabayService.fetch(params);

      setHits(cur => [...cur, ...resp.data.hits]);
      setStatus(RESOLVED);

      // error
    } catch ({ message }) {
      setStatus(REJECTED);
      toast.error(message);
    }
  };

  const handleSearchSubmit = query => {
    setHits([]);
    fetchImages({
      ...initialQueryParams,
      q: query,
    });
  };

  const handleSearchQueryChange = query => {
    if (!query) setHits([]);
  };

  return (
    <Container>
      <Loader visible={status === PENDING} />

      <Searchbar
        onSubmit={handleSearchSubmit}
        onChange={handleSearchQueryChange}
      />

      {/* Не рендерится при изменении status, только hits */}
      <MemoizedImageGallery hits={hits} />

      {status !== IDLE && hits.length > 0 && (
        // () => fetchImages() чтобы избежать передачи (e) в фукнцию
        <Button type="button" onClick={() => fetchImages()}>
          Load more
        </Button>
      )}

      <ToastContainer autoClose={1500} progressStyle={{ height: '3px' }} />
    </Container>
  );
};
