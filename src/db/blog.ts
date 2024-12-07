// src/db/blog.ts
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const blogCollection = collection(db, "blogs");

const addBlogPost = async (title: string, content: string) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(blogCollection, {
      title,
      content,
      userId: user.uid,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding blog post:", error);
  }
};

const getUserBlogPosts = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(blogCollection, where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  const blogPosts = querySnapshot.docs.map(doc => doc.data());
  return blogPosts;
};

export { addBlogPost, getUserBlogPosts };
