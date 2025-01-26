export type TFetchingAction<T> =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: T;
    }
  | {
      type: "ERROR";
      payload?: string;
    };

export type TFetchingWithLoadMoreAction<T> =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: T;
    }
  | {
      type: "ERROR";
      payload?: string;
    }
  | {
      type: "LOAD_MORE";
    };
