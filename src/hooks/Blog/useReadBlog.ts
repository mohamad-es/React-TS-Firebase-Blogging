import { useReducer, useEffect } from "react";
import { TBlog } from "src/types/blog";
import { fetchingReducer } from "../reducers";
import { readBlog } from "src/services/blog/readBlog";
import { TFetchingStates } from "src/types/states";

export const useReadBlog = (blogId: string) => {
  const initialData: TFetchingStates<TBlog> = {
    loading: true,
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer(fetchingReducer<TBlog>, initialData);

  const findBlog = async () => {
    dispatch({ type: "PENDING" });
    try {
      const docSnap = await readBlog(blogId);
      dispatch({ type: "SUCCESS", payload: { id: docSnap.id, ...docSnap.data() } as TBlog });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error instanceof Error ? (error.message as string) : "An unknown error occurred",
      });
    }
  };

  useEffect(() => {
    findBlog();
  }, []);

  return { state };
};
