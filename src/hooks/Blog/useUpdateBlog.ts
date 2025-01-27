import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { updateBlog } from "src/services/blog/updateBlog";
import { TBlog } from "src/types/blog";
import { errorToast, successToast } from "src/utils/Toast";
import { createBlogReducer } from "../reducers";
import { createBlogStates } from "../states";

export const useUpdateBlog = (blog: TBlog) => {
  const params = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(createBlogReducer, createBlogStates());

  useEffect(() => {
    if (blog) {
      dispatch({
        type: "SUCCESS",
        payload: {
          content: blog.content,
          title: blog.title,
          img: blog.img,
        },
      });
    }
  }, [blog]);

  const submitUpdateBlog = async () => {
    try {
      await updateBlog({
        blogId: params.blogid!,
        updateData: {
          title: state.title,
          content: state.content,
          img: state.img,
          user_id: auth.currentUser?.uid,
          user_email: auth.currentUser?.email,
          update_time: new Date(),
        },
      });

      successToast("Blog updated successfully");
      navigate(`/blog/${params.blogid}`);
    } catch (error) {
      errorToast("Failed to update blog");
    }
  };

  return { state, dispatch, submitUpdateBlog };
};
