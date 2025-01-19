import { useLogin } from "src/hooks/useAuth";
import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";

const Login = () => {
  const { handleLogin, loading } = useLogin();

  return <AuthForm auth_data={auth_data.login} submitFunction={handleLogin} loading={loading} />;
};

export default Login;
