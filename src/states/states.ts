import { TCreateBlogState, TFetchingStates, TFetchingWithLoadMore } from "src/types/states";

export const fetchingStates = <T>(): TFetchingStates<T> => {
  return {
    loading: false,
    error: null,
    data: null,
  };
};

export const fetchingStatesWithLoadMore = <T>(): TFetchingWithLoadMore<T> => {
  return { ...fetchingStates(), loadMoreLoading: false, blogsPerPage: 6, page: 1 };
};

export const createBlogStates = (): TCreateBlogState => {
  return {
    title: null,
    content: null,
    img: null,
  };
};
