import { doc, getDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";

type TGetSingleBlog = {
  blogId: string;
  setLoading: Function;
  setError: Function;
  setBlog: Function;
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


