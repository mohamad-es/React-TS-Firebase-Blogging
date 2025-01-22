import { useReducer } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { logIn } from "src/services/auth/login";
import { fetchingReducer, TFetchingInitialState } from "../reducers";
import { errorToast, successToast } from "src/utils/Toast";
import { TUser } from "src/types/user";

export const useLogin = () => {
  const initialState: TFetchingInitialState<TUser> = {
    loading: false,
    error: null,
    data: null,
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(fetchingReducer, initialState);

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
