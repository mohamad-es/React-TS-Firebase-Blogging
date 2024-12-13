import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";
import { FieldValues } from "react-hook-form";
import { toastInstance } from "src/utils/Toast";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Register: React.FC = () => {
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
      const userRef = collection(db, "users");
      await addDoc(userRef, {
        email: currentUser.user.email,
        id: currentUser.user.uid,
      });
      setLoading(false);
      toastInstance({
        text: auth_data.register.toast_message,
        type: "success",
      });
      navigate(`/${currentUser.user.uid}`);
    } catch (err) {
      setLoading(false);
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    }
  };

  return (
    <AuthForm
      auth_data={auth_data.register}
      submitFunction={handleRegister}
      loading={loading}
    />
  );
};

export default Register;
