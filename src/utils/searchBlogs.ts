import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const searchBlogs = async (searchQuery: string) => {
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
