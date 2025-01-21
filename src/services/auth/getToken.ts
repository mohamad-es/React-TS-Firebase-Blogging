import { getIdToken } from "firebase/auth";
import { auth } from "src/config/firebaseConfig";

export const getToken = async () => {
  if (auth.currentUser) {
    return await getIdToken(auth.currentUser);
  }
  return null;
};
