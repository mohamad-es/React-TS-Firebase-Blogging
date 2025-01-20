import { useReducer, useEffect } from "react";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { TFetchingInitialState, fetchingReducer } from "../reducers";

export const useSingleBlog = (blogId: string) => {

  const initialData: TFetchingInitialState<TBlog> = {
    loading: true,
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer(fetchingReducer<TBlog>, initialData);

  useEffect(() => {
    getSingleBlog({
      blogId,
      dispatch,
    });
  }, [blogId]);

  return { state };
};
