import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { db } from "src/config/firebaseConfig";
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

export { useFetchBlogs, searchBlogs };
