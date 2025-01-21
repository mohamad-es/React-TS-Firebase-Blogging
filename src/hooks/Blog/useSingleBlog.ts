import { useReducer, useEffect } from "react";
import { TBlog } from "src/types/blog";
import { TFetchingInitialState, fetchingReducer } from "../reducers";
import { readBlog } from "src/services/blog/readBlog";

export const useSingleBlog = (blogId: string) => {
  const initialData: TFetchingInitialState<TBlog> = {
    loading: true,
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer(fetchingReducer<TBlog>, initialData);

  // dispatch({ type: "SUCCESS", payload: { id: docSnap.id, ...docSnap.data() } as TBlog });

  // dispatch({
  //   type: "ERROR",
  //   payload: err instanceof Error ? (err.message as string) : "An unknown error occurred",
  // });

  useEffect(() => {
    dispatch({ type: "PENDING" });
    readBlog(blogId);
  }, [blogId]);

  return { state };
};
