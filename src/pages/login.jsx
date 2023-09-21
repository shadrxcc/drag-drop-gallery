import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { BiLoader } from "react-icons/bi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginsuccess, setLoginSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((usercredentials) => {
        setLoginSuccess("Sign in successful! Hold on a sec ;)");
        console.log(usercredentials);
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "Error signing in. Please try again.";

        if (error.code === "auth/user-not-found") {
          errorMessage =
            "User not found. Please check your email and try again.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Invalid password. Please enter the correct password.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address. Please enter a valid email.";
        } else if (error.code === "auth/invalid-login-credentials") {
          errorMessage = "Invalid login credentials. Check and try again.";
        }
        setError(errorMessage);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setLoading(false);
      });
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
            className={`${
              error ? "border-red-600" : ""
            } bg-transparent px-2 outline-none py-2 rounded-lg border`}
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
            className={`${
              error ? "border-red-600" : ""
            } bg-transparent px-2 outline-none py-2 rounded-lg border`}
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
          {loading ? (
            <BiLoader size={25} id="loader" className="m-auto" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <Link to={`/signup`}>
          <span className="border-b">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
