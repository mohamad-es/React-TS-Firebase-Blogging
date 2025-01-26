import { useEffect, useReducer } from "react";
import { blogListByQuery } from "src/utils/blogListByQuery";
import { TBlog } from "src/types/blog";
import { TFetchingWithLoadMore } from "src/types/states";
import { blogListByQueryReducer } from "../reducers";
import { orderBy, limit, where } from "firebase/firestore";
import { useParams } from "react-router";

const blogsInitialState: TFetchingWithLoadMore<TBlog[]> = {
  loading: false,
  error: null,
  data: null,
  page: 1,
  loadMoreLoading: false,
  blogsPerPage: 6,
};

export const useUserBlogs = () => {
  const params = useParams();
  const [state, dispatch] = useReducer(blogListByQueryReducer<TBlog[]>, blogsInitialState);

  useEffect(() => {
    blogListByQuery({
      filterQuery: [orderBy("create_time", "desc"), limit(6), where("user_id", "==", params.uid)],
      dispatch,
      state,
    });
  }, [state.page]);

  return { state, dispatch };
};
