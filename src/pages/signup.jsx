import { useState } from "react";
import { supabase } from "../../client";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error signing up:" + error.message);
        setError(error.message);
      } else {
        console.log(data);
        setSuccess(
          "Account created uccessfully! Check your mail for a verification link"
        );
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div
      id="signup"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon />
          {success}
        </Alert>
      )}
      <h1 className="text-4xl">Sign Up</h1>
      <form
        action="signup"
        onSubmit={handleSignup}
        className="flex flex-col gap-y-6"
      >
        <span className="flex gap-y-2 flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-transparent px-2 outline-none rounded-lg py-2 border"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            id="email"
            placeholder="john@email.com"
          />
        </span>

        <span className="flex gap-y-2 flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="bg-transparent px-2 outline-none py-2 rounded-lg border"
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </span>

        <button className="bg-white text-black py-2 w-full rounded-lg">
          Sign Up
        </button>
      </form>

      <p>Already have an account? <span className="border-b">Log in</span> </p>
    </div>
  );
};

export default Signup;
