import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";
import { useRegister } from "src/hooks/auth/useRegister";

const Register = () => {
  const { handleRegister, state } = useRegister();

  return <AuthForm auth_data={auth_data.register} submitFunction={handleRegister} state={state} />;
};

export default Register;
