export type TFetchingInitialState<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

export type TAction<T> =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: T;
    }
  | {
      type: "ERROR";
      payload: string;
    };



export const fetchingReducer = <T>(state: TFetchingInitialState<T>, action: TAction<T>): TFetchingInitialState<T> => {
  switch (action.type) {
    case "PENDING":
      return state;
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
