import { useLogin } from "src/hooks/auth/useLogin";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";

const Login = () => {
  const { handleLogin, state } = useLogin();

  return <AuthForm auth_data={auth_data.login} submitFunction={handleLogin} state={state} />;
};

export default Login;
