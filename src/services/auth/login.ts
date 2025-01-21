import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/config/firebaseConfig";

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
