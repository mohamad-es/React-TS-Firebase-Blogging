import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { db, auth } from "src/config/firebaseConfig";
import { toastInstance } from "src/utils/Toast";

export const useCreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null); // Base64 image
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createBlog = async () => {
    if (!title || !content) {
      toastInstance({
        text: "Please fill out the title and content",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title,
        content,
        img: image, // Save Base64 image
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      setLoading(false);
      toastInstance({
        text: "Blog successfully created",
        type: "success",
      });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (error) {
      setLoading(false);
      error instanceof Error
        ? toastInstance({
            text: error.message,
            type: "error",
          })
        : console.log(error);
    }
  };

  return { createBlog, setTitle, title, setContent, loading, setImage, image, content };
};