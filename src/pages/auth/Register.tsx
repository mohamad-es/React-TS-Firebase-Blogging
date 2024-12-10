import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";
import { FieldValues } from "react-hook-form";
import { toastInstance } from "src/utils/Toast";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: FieldValues) => {
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      toastInstance({
        text: auth_data.register.toast_message,
        type: "success",
      });
      navigate(`/${currentUser.user.uid}`);
    } catch (err) {
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    }
  };

  return (
    <AuthForm auth_data={auth_data.register} submitFunction={handleRegister} />
  );
};

export default Register;
