import { AddPrefixToKeys, doc, updateDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

type TUpdateUser = {
  userId: string;
  updateData: { [x: string]: any } & AddPrefixToKeys<string, any>;
};

export const updateUser = async ({ userId, updateData }: TUpdateUser) => {
  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, updateData);
};
