import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div
      id="signup"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>

        <button className="bg-white text-black py-2 w-full rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
