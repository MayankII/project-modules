import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="sm:w-full md:w-1/2 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-slate-200 p-5 pb-7 rounded-lg "
        >
          <h2 className=" text-2xl font-bold text-primary pb-2">Login</h2>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="email"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              className="btn btn-secondary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
            <Link
              to="/signup"
              href="#"
              className="link link-primary text-sm hover:text-secondary hover:underline no-underline inline-block"
            >
              Don't have an account? Click here{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
