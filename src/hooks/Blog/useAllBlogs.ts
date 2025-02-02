import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { QueryConstraint } from "firebase/firestore";
import { fetchingStatesWithLoadMore } from "../../states/states";
import { loadMoreReducer } from "src/reducers/loadMoreReducer";

export const useAllBlogs = (filterQuery: QueryConstraint[]) => {
  const [state, dispatch] = useReducer(loadMoreReducer<TBlog[]>, fetchingStatesWithLoadMore<TBlog[]>());

  useEffect(() => {
    blogListByQuery({ filterQuery, dispatch, state });
  }, [state.page]);

  return { state, dispatch };
};
