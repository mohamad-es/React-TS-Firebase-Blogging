import { collection, query, where, getDocs, doc, updateDoc, AddPrefixToKeys } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { TUser } from "src/types/user";
import { toastInstance } from "src/utils/Toast";

type TUpdateUser = {
  userId: string;
  updateData: { [x: string]: any } & AddPrefixToKeys<string, any>;
};

type TGetSingleBlog = {
  userId: string;
  setLoading: Function;
  setError: Function;
  setUser: Function;
};

const getSingleUser = async ({ userId, setUser, setError, setLoading }: TGetSingleBlog) => {
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

const serviceUpdateUser = ({userId, updateData}:TUpdateUser) => {
  const updateUser = async () => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updateData);
      toastInstance({
        text: "Profile succesfully added",
        type: "success",
      });
    } catch (error) {
      error instanceof Error
        ? toastInstance({
            text: error.message,
            type: "error",
          })
        : console.log(error);
    }
  };

  return updateUser();
};

export { getSingleUser, serviceUpdateUser };
