import { Navigate, Outlet } from "react-router";
import { auth } from "src/services/firebaseConfig";

const PrivateRoute = () => {
  const user = true;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
