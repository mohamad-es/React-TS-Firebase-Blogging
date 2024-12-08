import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const getToken = async () => {
  if (auth.currentUser) {
    return await getIdToken(auth.currentUser);
  }
  return null;
};

export const logOut = async () => {
  await signOut(auth);
};
