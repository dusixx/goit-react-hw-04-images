import PixabayService from 'services/pixabaySrv';

// orientation: all, imageType: all, order: most relevant
export const initialQueryParams = { page: 1, perPage: 6, safesearch: true };

export const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const message = {
  EOS_REACHED: 'End of search reached',
  NO_SEARCH_RESULT: 'No matching search results',
};

export const pixabayService = new PixabayService();
