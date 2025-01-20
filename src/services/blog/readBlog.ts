import { doc, getDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const readBlog = async (blogId: string) => {
  try {
    const docRef = doc(db, "blogs", blogId);
    await getDoc(docRef);
    return { type: "success" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Failed to update blog", type: "error" };
  }
};
