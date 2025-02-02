import { useEffect, useReducer } from "react";
import { readUser } from "src/services/user/readUser";
import { TUser } from "src/types/user";
import { fetchingReducer } from "src/reducers/fetchingReducer";
import { fetchingStates } from "src/states/states";

export const useReadUser = (user_id: string) => {
  const [state, dispatch] = useReducer(fetchingReducer<TUser>, fetchingStates<TUser>());

  const findUser = async () => {
    dispatch({ type: "PENDING" });
    try {
      const querySnapshot = await readUser(user_id);
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
