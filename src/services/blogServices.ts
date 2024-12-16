import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";

type TGetSingleBlog = {
  blogId: string;
  setLoading: Function;
  setError: Function;
  setBlog: Function;
};

type TGetListByQuery = {
  filterQuery: QueryConstraint[];
  setBlogs: Dispatch<SetStateAction<TBlog[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const getSingleBlog = async ({
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

export const getBlogListByQuery = async ({
  filterQuery,
  setBlogs,
  setError,
  setLoading,
}: TGetListByQuery) => {
  const blogRef = collection(db, "blogs");
  const q = query(blogRef, ...filterQuery);
  try {
    const querySnapshot = await getDocs(q);
    const fetchBlogs: TBlog[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TBlog[];
    setBlogs(fetchBlogs);
  } catch (error) {
    error instanceof Error ? setError(error.message) : console.log(error);
  } finally {
    setLoading(false);
  }
};
