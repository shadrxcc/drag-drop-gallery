import { useState } from "react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { supabase } from "../../client";


const Preloader = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 0);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during sign-out.");
      setLoading(false);
    }
  };

  return (
    <div id="preloader" className="flex justify-center lg:items-center">
      {error && (
        <Alert className="rounded-lg" status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div id="loader" className="pt-[200px] lg:pt-0">
        <p className="text-5xl">{user.email}</p>
        <p className="text-[32px]">drag n&apos; drop</p>
      </div>
      <button onClick={handleLogout} className="border py-3 px-5">
        Log out
      </button>
    </div>
  );
};

export default Preloader;
