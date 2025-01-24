import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { TFetchingWithLoadMore } from "src/types/states";
import { blogListByQueryReducer } from "../reducers";
import { orderBy, limit } from "firebase/firestore";

const blogsInitialState: TFetchingWithLoadMore<TBlog> = {
  loading: false,
  error: null,
  data: null,
  page: 1,
  loadMore: false,
  blogPerPage: 6,
};

export const useAllBlogs = () => {
  const [state, dispatch] = useReducer(blogListByQueryReducer<TBlog>, blogsInitialState);

  useEffect(() => {
    blogListByQuery({ filterQuery: [orderBy("create_time", "desc"), limit(6)], dispatch, state });
  }, [state.page]);

  return { state };
};
