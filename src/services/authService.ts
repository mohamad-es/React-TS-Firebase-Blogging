import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "src/config/firebaseConfig";

const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const getToken = async () => {
  if (auth.currentUser) {
    return await getIdToken(auth.currentUser);
  }
  return null;
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export {logOut, logIn, signUp, getToken}