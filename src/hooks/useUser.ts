import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "src/config/firebaseConfig";
import { getSingleUser } from "src/services/userServices";
import { TUser } from "src/types/user";

const useFetchUser = () => {
  const params = useParams();
  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    getSingleUser({
      setError: setUserError,
      setLoading: setUserLoading,
      setUser: setUser,
      userId: params.uid!,
    });
  }, [params.uid]);

  return { user, userLoading, userError };
};

const useUpdateUser = (user: TUser) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setImage(user.img || null);
      setLoading(false);
    }
  }, [user]);

  return { image, setImage, loading };
};

const useUpdateUserProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateUserProfile = async (image: string) => {
    if (!auth.currentUser) {
      // toastInstance({
      //   text: "User not authenticated",
      //   type: "error",
      // });
      return;
    }

    setLoading(true);
    try {
      // Check if the user exists
      const userId = auth.currentUser.uid;
      let userExists = false;

      await getSingleUser({
        userId,
        setUser: (user) => {
          if (user) userExists = true;
        },
        setError: (error) => {
          // toastInstance({
          //   text: error,
          //   type: "error",
          // });
        },
        setLoading: () => {}, // No need to handle loading here
      });

      if (!userExists) {
        // toastInstance({
        //   text: "User document does not exist",
        //   type: "error",
        // });
        return;
      }

      // Update the user's profile image
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        img: image, // Update the user's profile image with the Base64 string
      });

      // toastInstance({
      //   text: "Profile image successfully updated",
      //   type: "success",
      // });
    } catch (error) {
      // error instanceof Error
      //   ? toastInstance({
      //       text: error.message,
      //       type: "error",
      //     })
      //   : console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateUserProfile, loading };
};

export { useFetchUser, useUpdateUser, useUpdateUserProfile};
