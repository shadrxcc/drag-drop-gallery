import { useState } from "react";
import { supabase } from "../../client";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "Account created uccessfully!"
        );
        setInterval(() => {
          navigate(`/`)
        }, 3000)
      }
    } catch (error) {
      setError("Error signing up:", error.message);
    }
  };

  return (
    <div
      id="signup"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
      {error && (
        <Alert className="rounded-lg text-black" status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="rounded-lg text-black" status="success">
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

      <p>
        Already have an account?{" "}
        <Link to={`/login`}>
          <span className="border-b">Log in</span>
        </Link>{" "}
      </p>
    </div>
  );
};

export default Signup;
