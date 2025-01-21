import { collection, addDoc, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const createBlog = async (payload: WithFieldValue<DocumentData>) => {
  const blogRef = collection(db, "blogs");
  return await addDoc(blogRef, payload);
};
