import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { auth, db } from "src/config/firebaseConfig";
import { auth_data } from "src/data/auth";
import { toastInstance } from "src/utils/Toast";

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: FieldValues) => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userId = currentUser.user.uid;

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        email: values.email,
        user_id: userId,
      });

      setLoading(false);
      toastInstance({
        text: auth_data.register.toast_message,
        type: "success",
      });
      navigate(`/${userId}`);
    } catch (err) {
      setLoading(false);
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    }
  };

  return { handleRegister, loading };
};