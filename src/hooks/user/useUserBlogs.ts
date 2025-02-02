import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { orderBy, limit, where } from "firebase/firestore";
import { useParams } from "react-router";
import { loadMoreReducer } from "src/reducers/loadMoreReducer";
import { fetchingStatesWithLoadMore } from "src/states/states";

export const useUserBlogs = () => {
  const params = useParams();
  const [state, dispatch] = useReducer(loadMoreReducer<TBlog[]>, fetchingStatesWithLoadMore<TBlog[]>());

  useEffect(() => {
    blogListByQuery({
      filterQuery: [orderBy("create_time", "desc"), limit(6), where("user_id", "==", params.uid)],
      dispatch,
      state,
    });
  }, [state.page]);

  return { state, dispatch };
};
