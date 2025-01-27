import { TCreateBlogAction, TFetchingAction, TFetchingWithLoadMoreAction } from "src/types/actions";
import { TCreateBlogState, TFetchingStates, TFetchingWithLoadMore } from "src/types/states";

export const fetchingReducer = <T>(state: TFetchingStates<T>, action: TFetchingAction<T>): TFetchingStates<T> => {
  switch (action.type) {
    case "PENDING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload ? action.payload : null };
    default:
      return state;
  }
};

export const blogListByQueryReducer = <T>(
  state: TFetchingWithLoadMore<T>,
  action: TFetchingWithLoadMoreAction<T>
): TFetchingWithLoadMore<T> => {
  switch (action.type) {
    case "PENDING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload ? action.payload : null };
    case "LOAD_MORE":
      return { ...state, loadMoreLoading: true, page: state.page + 1 };
    case "LOAD_MORE_STOP":
      return { ...state, loadMoreLoading: false };
    default:
      return state;
  }
};

export const createBlogReducer = (state: TCreateBlogState, action: TCreateBlogAction): TCreateBlogState => {
  switch (action.type) {
    case "PENDING":
      return { ...state, loading: true };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        title: action.payload.title,
        content: action.payload.content,
        img: action.payload.img,
      };
    case "ERROR":
      return { ...state, loading: false, error: action.payload ? action.payload : null };
    default:
      return state;
  }
};
