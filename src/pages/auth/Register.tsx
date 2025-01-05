import AuthForm from "./_components/AuthForm";
import { auth_data } from "src/data/auth";
import { useRegister } from "src/hooks/useRegister";

const Register = () => {
  const { handleRegister, loading } = useRegister();

  return (
    <AuthForm
      auth_data={auth_data.register}
      submitFunction={handleRegister}
      loading={loading}
    />
  );
};

export default Register;
