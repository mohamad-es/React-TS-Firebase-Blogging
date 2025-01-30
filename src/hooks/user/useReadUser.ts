import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { readUser } from "src/services/user/readUser";
import { TUser } from "src/types/user";
import { TFetchingStates } from "src/types/states";
import { fetchingReducer } from "src/reducers/fetchingReducer";

export const useReadUser = () => {
  const params = useParams();

  const initialState: TFetchingStates<TUser> = {
    loading: false,
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer(fetchingReducer<TUser>, initialState);

  const findUser = async () => {
    dispatch({ type: "PENDING" });
    try {
      const querySnapshot = await readUser(params.uid!);
      const userDoc = querySnapshot.docs[0];
      dispatch({ type: "SUCCESS", payload: { id: userDoc.id, ...userDoc.data() } as TUser });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Failed to find user" });
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return { state };
};
