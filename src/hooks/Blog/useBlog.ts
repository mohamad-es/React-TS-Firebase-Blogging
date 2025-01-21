import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "src/config/firebaseConfig";
import { deleteBlog } from "src/services/blog/deleteBlog";
import { TBlog } from "src/types/blog";

type TFetchBlogs<T> = {
  filterQuery: T[];
};

type TGetAllBlogs = {
  setBlogs: Dispatch<SetStateAction<TBlog[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
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

  const deleteBlogSubmit = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    setBtnLoading(true);

    try {
      await deleteBlog(blogId);
      setBtnLoading(false);
      // toastInstance({ text: "Blog deleted successfully!", type: "success" });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (err) {
      setBtnLoading(false);
      console.error("Error deleting blog:", err);
    }
  };

  return { deleteBlogSubmit, btnLoading };
};

const searchBlogs = async (searchQuery: string) => {
  const blogsCollectionRef = collection(db, "blogs");
  const q = query(
    blogsCollectionRef,
    where("title", ">=", searchQuery),
    where("title", "<=", searchQuery + "\uf8ff") // Allows partial matching
  );

  const querySnapshot = await getDocs(q);
  const blogs: any[] = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), id: doc.id });
  });

  return blogs;
};

const getBlogListByQuery = async ({
  setBlogs,
  setError,
  setLoading,
  page,
  blogsPerPage,
  filterQuery = [], // Optional filter query
}: TGetAllBlogs & {
  page: number;
  blogsPerPage: number;
  filterQuery?: any[]; // Accept filters as an optional parameter
}) => {
  setLoading(true);
  setError(null);

  try {
    // Reference the blogs collection
    const blogRef = collection(db, "blogs");

    // Apply filters and pagination
    const queryRef = query(
      blogRef,
      ...filterQuery, // Apply filters if provided
      limit(blogsPerPage * page) // Apply pagination
    );

    // Fetch documents
    const querySnapshot = await getDocs(queryRef);

    // Map the documents to TBlog array
    const blogs: TBlog[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TBlog[];

    // Update state with fetched blogs
    setBlogs(blogs);
  } catch (error) {
    error instanceof Error ? setError(error.message) : console.log(error);
  } finally {
    setLoading(false);
  }
};

export { useFetchBlogs, useUpdateBlog, useDeleteBlog, searchBlogs };
