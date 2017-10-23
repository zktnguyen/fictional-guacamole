/* eslint-disable */
import api from '../api';

export const searchQuery = (query) => () =>
  api.user.searchQuery(query);