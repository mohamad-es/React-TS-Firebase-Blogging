import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { TFetchingWithLoadMore } from "src/types/states";
import { blogListByQueryReducer } from "../reducers";
import { QueryConstraint } from "firebase/firestore";

const blogsInitialState: TFetchingWithLoadMore<TBlog[]> = {
  loading: false,
  error: null,
  data: null,
  page: 1,
  loadMoreLoading: false,
  blogsPerPage: 6,
};

export const useAllBlogs = (filterQuery: QueryConstraint[]) => {
  const [state, dispatch] = useReducer(blogListByQueryReducer<TBlog[]>, blogsInitialState);

  useEffect(() => {
    blogListByQuery({ filterQuery, dispatch, state });
  }, [state.page]);

  return { state, dispatch };
};
