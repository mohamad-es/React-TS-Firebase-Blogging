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
