import { useState } from "react";
import { supabase } from "../../client";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const Preloader = () => {
  const [error, setError] = useState("");
  const signOut = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
      console.error;
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
        <p className="text-5xl">sheddy&apos;s</p>
        <p className="text-[32px]">drag n&apos; drop</p>
      </div>
      <button onClick={signOut} className="border py-3 px-5">
        Log out
      </button>
    </div>
  );
};

export default Preloader;
