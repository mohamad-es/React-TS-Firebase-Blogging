export type TFetchingStates<T> = {
  loading: boolean;
  error: null | string;
  data: null | T;
};

export interface TFetchingWithLoadMore<T> extends TFetchingStates<T> {
  page: number;
  loadMoreLoading: boolean;
  blogsPerPage: number;
}
