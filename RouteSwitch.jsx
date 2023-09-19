import { Route, Routes } from "react-router-dom";
import Signup from "./src/pages/signup";
import Login from "./src/pages/login";
import Preloader from "./src/components/preloader";

const RouteSwitch = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loader" element={<Preloader/>}/>
      </Routes>
    </>
  );
};

export default RouteSwitch;
