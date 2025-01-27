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

export type TCreateBlogState = {
  title?: string | null;
  content?: string | null;
  img?: string | null;
  loading?: boolean;
  error?: string | null;
};
