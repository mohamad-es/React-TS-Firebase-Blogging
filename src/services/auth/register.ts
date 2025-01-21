import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/config/firebaseConfig";

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
