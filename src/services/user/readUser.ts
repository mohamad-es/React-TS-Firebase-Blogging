import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const readUser = async (userId: string) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("user_id", "==", userId));
  return await getDocs(userQuery);
};
