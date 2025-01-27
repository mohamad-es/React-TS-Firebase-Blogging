import { TCreateBlogState } from "./states";

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
    }
  | {
      type: "LOAD_MORE_STOP";
    };

export type TCreateBlogAction =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: TCreateBlogState;
    }
  | {
      type: "ERROR";
      payload?: string;
    };
