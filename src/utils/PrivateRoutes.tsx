import { auth } from "src/services/firebase";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
