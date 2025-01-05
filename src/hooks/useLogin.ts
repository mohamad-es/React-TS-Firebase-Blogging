import { useState } from "react";
import { logIn } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";
import { useNavigate } from "react-router";
import { FieldValues } from "react-hook-form";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: FieldValues) => {
    setLoading(true);
    try {
      const currentUser = await logIn(values.email, values.password);
      toastInstance({ text: "Login successful!", type: "success" });
      navigate(`/${currentUser.uid}`);
    } catch (err) {
      err instanceof Error
        ? toastInstance({ text: err.message, type: "error" })
        : console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};

export default useLogin;