import { collection, query, limit, getDocs, QueryConstraint } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "src/config/firebaseConfig";
import { TAllBlogsAction } from "src/types/actions";
import { TBlog } from "src/types/blog";
import { TFetchingWithLoadMore } from "src/types/states";

type TBlogListByQuery = {
  state: TFetchingWithLoadMore<TBlog>;
  dispatch: Dispatch<TAllBlogsAction<TBlog>>;
  filterQuery: QueryConstraint[];
};

export const blogListByQuery = async ({ filterQuery, dispatch, state }: TBlogListByQuery) => {
  dispatch({ type: "PENDING" });
  try {
    const blogRef = collection(db, "blogs");
    const queryRef = query(blogRef, ...filterQuery, limit(state.blogPerPage * state.page));

    const querySnapshot = await getDocs(queryRef);

    const blogs: TBlog = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as TBlog;

    dispatch({ type: "SUCCESS", payload: blogs });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error instanceof Error ? error.message : "Failed to load lists" });
  }
};
