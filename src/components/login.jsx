const Login = () => {
  return (
    <div
      id="login"
      className="flex flex-col gap-y-6 justify-center px-4 md:px-20 lg:px-40"
    >
      <h1 className="text-4xl">Sign In</h1>
      <form action="" className="flex flex-col gap-y-6">
        <span className="flex gap-y-2 flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-transparent px-2 outline-none rounded-lg py-2 border"
            type="email"
            name="email"
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
