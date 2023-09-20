import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginsuccess, setLoginSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error signing up:" + error.message);
        setError(error.message);
      } else {
        console.log(data);
        setLoginSuccess(
          "Account created uccessfully! Check your mail for a verification link"
        );
        setInterval(() => {
          navigate(`/loader`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div
      id="login"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
      {error && (
        <Alert className="rounded-lg text-black" status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loginsuccess && (
        <Alert className="rounded-lg text-black" status="success">
          <AlertIcon />
          {loginsuccess}
        </Alert>
      )}
      <h1 className="text-4xl">Sign In</h1>
      <form
        action="login"
        onSubmit={handleLogin}
        className="flex flex-col gap-y-6"
      >
        <span className="flex gap-y-2 flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-transparent px-2 outline-none rounded-lg py-2 border"
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            value={email}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            id="password"
          />
        </span>

        <button className="bg-white text-black py-2 w-full rounded-lg">
          Sign In
        </button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <Link to={`/`}>
          <span className="border-b">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
