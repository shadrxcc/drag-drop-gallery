
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./src/context/authcontext";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;