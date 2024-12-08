import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const user = true;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
