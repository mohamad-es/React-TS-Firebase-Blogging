import { AddPrefixToKeys, doc, updateDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

type TUpdateBlog = {
  blogId: string;
  updateData: { [x: string]: any } & AddPrefixToKeys<string, any>;
};

export const updateBlog = async ({ blogId, updateData }: TUpdateBlog) => {
  const blogRef = doc(db, "blogs", blogId);
  return await updateDoc(blogRef, updateData);
};
