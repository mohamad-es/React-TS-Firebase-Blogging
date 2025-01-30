import { TFetchingAction } from "src/types/actions";
import { TFetchingStates } from "src/types/states";

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