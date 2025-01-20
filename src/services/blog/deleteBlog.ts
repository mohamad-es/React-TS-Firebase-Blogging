import { deleteDoc, doc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const deleteBlog = async (blogId: string) => {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
    return { message: "Blog succesfully deleted", type: "success" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Failed to delete blog", type: "error" };
  }
};
