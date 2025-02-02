import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "src/config/firebaseConfig";

export const register = async (email: string, password: string) => {
  const currentUser = await createUserWithEmailAndPassword(auth, email, password);
  const userId = currentUser.user.uid;
  const userRef = collection(db, "users");
  return await addDoc(userRef, {
    email: email,
    user_id: userId,
  });
};
