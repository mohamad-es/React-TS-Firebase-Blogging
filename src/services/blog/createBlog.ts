import { collection, addDoc, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const createBlog = async (payload: WithFieldValue<DocumentData>) => {
  try {
    const blogRef = collection(db, "blogs");
    await addDoc(blogRef, payload);
    return { message: "Blog successfully created", type: "success" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Failed to create blog", type: "error" };
  }
};
