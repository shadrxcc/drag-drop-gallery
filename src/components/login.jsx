import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      id="login"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
      <h1 className="text-4xl">Sign In</h1>
      <form action="login" onSubmit={handleLogin} className="flex flex-col gap-y-6">
        <span className="flex gap-y-2 flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-transparent px-2 outline-none rounded-lg py-2 border"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </span>

        <button className="bg-white text-black py-2 w-full rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
