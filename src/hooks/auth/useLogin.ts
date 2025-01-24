import { useReducer } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { logIn } from "src/services/auth/login";
import { fetchingReducer } from "../reducers";
import { errorToast, successToast } from "src/utils/Toast";
import { fetchingStates } from "../states";

export const useLogin = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(fetchingReducer, fetchingStates);

  const handleLogin = async (values: FieldValues) => {
    try {
      dispatch({ type: "PENDING" });
      const currentUser = await logIn(values.email, values.password);
      navigate(`/${currentUser.uid}/profile`);
      dispatch({ type: "SUCCESS", payload: currentUser });
      successToast("User successfully login");
    } catch (error) {
      dispatch({ type: "ERROR" });
      errorToast("Email or Password is wrong");
    }
  };

  return { handleLogin, state };
};
