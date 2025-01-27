import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { blogListByQueryReducer } from "../reducers";
import { QueryConstraint } from "firebase/firestore";
import { fetchingStatesWithLoadMore } from "../states";

export const useAllBlogs = (filterQuery: QueryConstraint[]) => {
  const [state, dispatch] = useReducer(blogListByQueryReducer<TBlog[]>, fetchingStatesWithLoadMore<TBlog[]>());

  useEffect(() => {
    blogListByQuery({ filterQuery, dispatch, state });
  }, [state.page]);

  return { state, dispatch };
};
