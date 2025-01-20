import { AddPrefixToKeys, doc, updateDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

type TUpdateBlog = {
  blogId: string;
  updateData: { [x: string]: any } & AddPrefixToKeys<string, any>;
};

export const updateBlog = async ({ blogId, updateData }: TUpdateBlog) => {
  try {
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, updateData);
    return { message: "Blog successfully updated", type: "success" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Failed to update blog", type: "error" };
  }
};
