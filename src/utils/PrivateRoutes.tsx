// src/utils/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router";
import { auth } from "../services/firebase";

const PrivateRoute = () => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
