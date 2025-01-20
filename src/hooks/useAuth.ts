import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { logIn } from "src/services/authService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "src/config/firebaseConfig";
import { auth_data } from "src/data/auth";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: FieldValues) => {
    setLoading(true);
    try {
      const currentUser = await logIn(values.email, values.password);
      // toastInstance({ text: "Login successful!", type: "success" });
      navigate(`/${currentUser.uid}/profile`);
    } catch (err) {
      // err instanceof Error ? toastInstance({ text: err.message, type: "error" }) : console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};

const useRegister = () => {
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
      // toastInstance({
      //   text: auth_data.register.toast_message,
      //   type: "success",
      // });
      navigate(`/${userId}/setting`);
    } catch (err) {
      // setLoading(false);
      // err instanceof Error
      //   ? toastInstance({ text: err.message, type: "error" })
      //   : console.log(err);
    }
  };

  return { handleRegister, loading };
};

export { useLogin, useRegister };
