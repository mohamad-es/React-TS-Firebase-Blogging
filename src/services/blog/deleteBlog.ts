import { deleteDoc, doc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const deleteBlog = async (blogId: string) => {
  return await deleteDoc(doc(db, "blogs", blogId));
};
