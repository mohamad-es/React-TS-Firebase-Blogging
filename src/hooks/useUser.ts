import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleUser } from "src/services/userServices";
import { TUser } from "src/types/user";

const useFetchUser = () => {
  const params = useParams();
  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    getSingleUser({
      setError: setUserError,
      setLoading: setUserLoading,
      setUser: setUser,
      userId: params.uid!,
    });
  }, [params.uid]);

  return { user, userLoading, userError };
};

const useUpdateUser = (user: TUser) => {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setImage(user.img || null);
      setLoading(false);
    }
  }, [user]);

  return { image, setImage, loading };
};

export { useFetchUser, useUpdateUser };
