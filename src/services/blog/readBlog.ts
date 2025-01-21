import { doc, getDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const readBlog = async (blogId: string) => {
  const docRef = doc(db, "blogs", blogId);
  return await getDoc(docRef);
};
