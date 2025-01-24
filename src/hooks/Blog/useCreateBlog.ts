import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { createBlog } from "src/services/blog/createBlog";
import { errorToast, successToast } from "src/utils/Toast";

export const useCreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createBlogSubmit = async () => {
    if (!title || !content) {
      errorToast("Please fill out the title and content");
      return;
    }
    setLoading(true);

    try {
      await createBlog({
        title,
        content,
        img: image,
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      successToast("Blog successfully created");
      navigate(`/${auth.currentUser?.uid}`);
    } catch (error) {
      errorToast(error instanceof Error ? error.message : "Failed to create blog");
    }
  };

  return { createBlogSubmit, setTitle, title, setContent, loading, setImage, image, content };
};
