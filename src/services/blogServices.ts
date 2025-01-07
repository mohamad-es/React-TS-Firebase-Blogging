import {
  AddPrefixToKeys,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";
import { toastInstance } from "src/utils/Toast";

type TGetSingleBlog = {
  blogId: string;
  setLoading: Function;
  setError: Function;
  setBlog: Function;
};

type TGetAllBlogs = {
  setBlogs: Dispatch<SetStateAction<TBlog[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type TUpdateBlog = {
  blogId: string;
  updateData: { [x: string]: any } & AddPrefixToKeys<string, any>;
};

const getSingleBlog = async ({
  blogId,
  setBlog,
  setError,
  setLoading,
}: TGetSingleBlog) => {
  const fetchBlog = async () => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() } as TBlog);
      } else {
        setError("No such document!");
      }
    } catch (err) {
      err instanceof Error ? setError(err.message) : console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (blogId) {
    return fetchBlog();
  }
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

const updateBlog = ({ blogId, updateData }: TUpdateBlog) => {
  const updateBlogReturn = async () => {
    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, updateData);
      toastInstance({
        text: "Blog successfully updated",
        type: "success",
      });
    } catch (error) {
      error instanceof Error
        ? toastInstance({
            text: error.message,
            type: "error",
          })
        : console.log(error);
    }
  };

  return updateBlogReturn();
};

const deleteBlogById = async (blogId: string) => {
  if (blogId) {
    alert("Invalid blog ID");
    return;
  }

  await deleteDoc(doc(db, "blogs", blogId));
};

export {
  getBlogListByQuery,
  getSingleBlog,
  updateBlog,
  deleteBlogById,
  searchBlogs,
};
