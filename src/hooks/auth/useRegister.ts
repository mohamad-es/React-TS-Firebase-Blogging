import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { FieldValues } from "react-hook-form";
import { fetchingReducer } from "../reducers";
import { register } from "src/services/auth/register";
import { errorToast, successToast } from "src/utils/Toast";
import { fetchingStates } from "../states";

const useRegister = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(fetchingReducer, fetchingStates);

  const handleRegister = async (values: FieldValues) => {
    dispatch({ type: "PENDING" });
    try {
      const user = await register(values.email, values.password);
      successToast("User successfully register");
      dispatch({ type: "SUCCESS", payload: user });
      navigate(`/${user.id}/setting`);
    } catch (error) {
      dispatch({ type: "ERROR" });
      errorToast(error instanceof Error ? error.message : "Failed to create user");
    }
  };

  return { handleRegister, state };
};

export { useRegister };
