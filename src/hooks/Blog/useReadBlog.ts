import { useReducer, useEffect } from "react";
import { TBlog } from "src/types/blog";
import { readBlog } from "src/services/blog/readBlog";
import { fetchingStates } from "../../states/states";
import { fetchingReducer } from "src/reducers/fetchingReducer";

export const useReadBlog = (blogId: string) => {
  const [state, dispatch] = useReducer(fetchingReducer<TBlog>, fetchingStates<TBlog>());

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
