import { signOut } from "firebase/auth";
import { auth } from "src/config/firebaseConfig";

export const logOut = async () => {
  return await signOut(auth);
};
