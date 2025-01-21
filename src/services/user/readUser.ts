import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { TUser } from "src/types/user";

type TGetSingleBlog = {
  userId: string;
  setLoading: Function;
  setError: Function;
  setUser: Function;
};

export const readUser = async ({ userId, setUser, setError, setLoading }: TGetSingleBlog) => {
  setLoading(true);
  setError(null);

  try {
    // Reference the users collection
    const usersCollection = collection(db, "users");

    // Create a query to find the user by user_id field
    const userQuery = query(usersCollection, where("user_id", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    // Check if any documents match the query
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // Assume only one match
      setUser({ id: userDoc.id, ...userDoc.data() } as TUser);
    } else {
      setError("No such user found!");
    }
  } catch (err) {
    err instanceof Error ? setError(err.message) : console.log(err);
  } finally {
    setLoading(false);
  }
};
