import { TAllBlogsAction, TReadBlogAction } from "src/types/actions";
import { TFetchingStates, TFetchingWithLoadMore } from "src/types/states";

export const fetchingReducer = <T>(state: TFetchingStates<T>, action: TReadBlogAction<T>): TFetchingStates<T> => {
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
  action: TAllBlogsAction<T>
): TFetchingWithLoadMore<T> => {
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
