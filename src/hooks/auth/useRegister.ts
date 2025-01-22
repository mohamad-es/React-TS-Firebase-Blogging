import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { FieldValues } from "react-hook-form";
import { fetchingReducer, TFetchingInitialState } from "../reducers";
import { TUser } from "src/types/user";
import { register } from "src/services/auth/register";
import { errorToast, successToast } from "src/utils/Toast";

const useRegister = () => {
  const initialState: TFetchingInitialState<TUser> = {
    loading: false,
    error: null,
    data: null,
  };
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(fetchingReducer, initialState);

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
