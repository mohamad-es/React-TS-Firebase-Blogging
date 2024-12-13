import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { logIn } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: FieldValues) => {
    setLoading(true);
    try {
      const currentUser = await logIn(values.email, values.password);
      setLoading(false);
      toastInstance({ text: auth_data.login.toast_message, type: "success" });
      navigate(`/${currentUser.uid}`);
    } catch (err) {
      setLoading(false);
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    }
  };

  return (
    <AuthForm
      auth_data={auth_data.login}
      submitFunction={handleLogin}
      loading={loading}
    />
  );
};

export default Login;
