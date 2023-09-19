import { Route, Routes } from "react-router-dom";
import Signup from "./src/pages/signup";
import Login from "./src/pages/login";
import Preloader from "./src/components/preloader";
import AuthProvider from "./src/context/authcontext";
import AuthRoute from "./authroute";
// import { useAuth } from "./src/context/useAuth";

const RouteSwitch = () => {
  // const { user } = useAuth()
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<AuthRoute />}>
            <Route path="/loader" element={<Preloader />} />
          </Route>
          {/* {user ? (
          <Route path="/loader" element={<Preloader />} />
        ) : (
          <Route
            path="/loader"
            element={<Navigate to="/login" replace />}
          />
        )} */}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default RouteSwitch;
