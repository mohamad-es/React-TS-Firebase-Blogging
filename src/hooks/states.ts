export const fetchingStates = {
  loading: false,
  error: null,
  data: null,
};

export const fetchingStatesWithLoadMore = {
  ...fetchingStates,
  loadMore: false,
  blogPerPage: 6,
  page: 1,
};
