import { TFetchingWithLoadMoreAction } from "src/types/actions";
import { TFetchingWithLoadMore } from "src/types/states";

export const loadMoreReducer = <T>(
  state: TFetchingWithLoadMore<T>,
  action: TFetchingWithLoadMoreAction<T>
): TFetchingWithLoadMore<T> => {
  switch (action.type) {
    case "PENDING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, loadMoreLoading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, loadMoreLoading: false, error: action.payload ? action.payload : null };
    case "LOAD_MORE":
      return { ...state, loadMoreLoading: true, page: state.page + 1 };
    default:
      return state;
  }
};
