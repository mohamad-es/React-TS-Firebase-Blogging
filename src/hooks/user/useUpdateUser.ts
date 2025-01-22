import { useState, useEffect } from "react";
import { TUser } from "src/types/user";

export const useUpdateUser = (user: TUser) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setImage(user.img || null);
      setLoading(false);
    }
  }, [user]);

  return { image, setImage, loading };
};