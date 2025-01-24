export type TReadBlogAction<T> =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: T;
    }
  | {
      type: "ERROR";
      payload?: string;
    };

export type TAllBlogsAction<T> =
  | { type: "PENDING" }
  | {
      type: "SUCCESS";
      payload: T;
    }
  | {
      type: "ERROR";
      payload?: string;
    };
