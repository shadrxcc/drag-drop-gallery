import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./src/context/authcontext";
import ScrollToTop from "./src/utils/ScrollToTop";

const Library = lazy(() => import("./src/components/library"));
const Login = lazy(() => import("./src/pages/login"));
const Signup = lazy(() => import("./src/pages/signup"));

const RouteSwitch = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Library />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default RouteSwitch;
