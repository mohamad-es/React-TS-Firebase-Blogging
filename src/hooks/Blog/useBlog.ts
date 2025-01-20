import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { deleteBlogById, getBlogListByQuery } from "src/services/blogServices";
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
    setLoadMoreLoading(true);
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

const useUpdateBlog = (blog: TBlog) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null); // Base64 image
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (blog) {
      // Simulate loading delay (optional, for demonstration purposes)
      const timer = setTimeout(() => {
        setContent(blog.content);
        setTitle(blog.title);
        setImage(blog.img || null);
        setLoading(false); // Set loading to false after data is loaded
      }, 1000); // 1-second delay

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [blog]);

  return { title, image, content, setImage, setTitle, setContent, loading };
};

const useDeleteBlog = (blogId: string) => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
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

export { useFetchBlogs, useUpdateBlog, useDeleteBlog };
