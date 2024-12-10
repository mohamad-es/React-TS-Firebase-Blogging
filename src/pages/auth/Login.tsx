import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { logIn } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: FieldValues) => {
    try {
      const currentUser = await logIn(values.email, values.password);
      toastInstance({ text: auth_data.login.toast_message, type: "success" });
      navigate(`/${currentUser.uid}`);
    } catch (err) {
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    }
  };

  return <AuthForm auth_data={auth_data.login} submitFunction={handleLogin} />;
};

export default Login;
