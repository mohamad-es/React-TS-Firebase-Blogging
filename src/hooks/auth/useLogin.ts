import { useReducer } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { logIn } from "src/services/auth/login";
import { fetchingReducer, TFetchingInitialState } from "../reducers";

export const useLogin = () => {
  const initialState: TFetchingInitialState<unknown> = {
    loading: false,
    error: null,
    data: null,
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(fetchingReducer, initialState);

  const handleLogin = async (values: FieldValues) => {
    dispatch({ type: "PENDING" });
    try {
      const currentUser = await logIn(values.email, values.password);
      navigate(`/${currentUser.uid}/profile`);
      dispatch({ type: "SUCCESS", payload: currentUser });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error instanceof Error ? error.message : "Email or Password is wrong" });
    }
  };

  return { handleLogin, state };
};
