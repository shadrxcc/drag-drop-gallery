import { Route, Routes } from "react-router-dom";
import Signup from "./src/pages/signup";
import Login from "./src/pages/login";

import AuthProvider from "./src/context/authcontext";
// import AuthRoute from "./authroute";
import Library from "./src/components/library";
import { SkeletonTheme } from "react-loading-skeleton";
// import { useAuth } from "./src/context/useAuth";

const RouteSwitch = () => {
  // const { user } = useAuth()
  return (
    <>
      <AuthProvider>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* <Route element={<AuthRoute />}></Route> */}
            {/* {user ? (
          <Route path="/loader" element={<Preloader />} />
        ) : (
          <Route
            path="/loader"
            element={<Navigate to="/login" replace />}
          />
        )} */}
          </Routes>
        </SkeletonTheme>
      </AuthProvider>
    </>
  );
};

export default RouteSwitch;
