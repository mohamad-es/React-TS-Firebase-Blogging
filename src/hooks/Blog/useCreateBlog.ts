import { useReducer } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { createBlog } from "src/services/blog/createBlog";
import { errorToast, successToast } from "src/utils/Toast";
import { fetchingReducer } from "src/reducers/fetchingReducer";
import { fetchingStates } from "src/states/states";
import { TCreateBlogState } from "src/types/states";

export const useCreateBlog = () => {
  const [state, dispatch] = useReducer(fetchingReducer<TCreateBlogState>, fetchingStates<TCreateBlogState>());

  const navigate = useNavigate();

  const createBlogSubmit = async () => {
    if (!state.data?.title || !state.data?.content) {
      errorToast("Please fill out the title and content");
      return;
    }

    dispatch({ type: "PENDING" });

    try {
      await createBlog({
        title: state.data?.title,
        content: state.data?.content,
        img: state.data?.img,
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      successToast("Blog successfully created");
      navigate(`/${auth.currentUser?.uid}`);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error instanceof Error ? error.message : "Failed to create blog" });
      errorToast(error instanceof Error ? error.message : "Failed to create blog");
    }
  };

  return { createBlogSubmit, dispatch, state };
};
