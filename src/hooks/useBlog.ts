import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "src/config/firebaseConfig";
import {
  deleteBlogById,
  getBlogListByQuery,
  getSingleBlog,
} from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { toastInstance } from "src/utils/Toast";

type TFetchBlogs<T> = {
  filterQuery: T[];
};

const useFetchBlogs = <T>({ filterQuery }: TFetchBlogs<T>) => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    setLoadMoreLoading(true); // Start load more loading
    getBlogListByQuery({
      filterQuery,
      setBlogs,
      setError,
      setLoading,
      blogsPerPage,
      page,
    }).finally(() => setLoadMoreLoading(false));
  }, [page]);

  return {
    blogs,
    loadMoreLoading,
    loading,
    error,
    setPage,
    blogsPerPage,
    page,
  };
};

const useFetchSingleBlog = (blogId: string) => {
  const [blog, setBlog] = useState<TBlog>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleBlog({
      blogId,
      setBlog,
      setError,
      setLoading,
    });
  }, []);

  return { error, loading, blog };
};

const useUpdateBlog = (blog: TBlog) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null); // Base64 image

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTitle(blog.title);
      setImage(blog.img || null);
    }
  }, [blog]);

  return { title, image, content, setImage, setTitle, setContent };
};

const useDeleteBlog = (blogId: string) => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    setBtnLoading(true);

    try {
      await deleteBlogById(blogId);
      setBtnLoading(false);
      toastInstance({ text: "Blog deleted successfully!", type: "success" });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (err) {
      setBtnLoading(false);
      console.error("Error deleting blog:", err);
    }
  };

  return { deleteBlog, btnLoading };
};

const useCreateBlog = () => {
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

  return { createBlog, setTitle, title, setContent, loading, setImage ,image,content };
};

export {
  useFetchBlogs,
  useFetchSingleBlog,
  useUpdateBlog,
  useDeleteBlog,
  useCreateBlog,
};
