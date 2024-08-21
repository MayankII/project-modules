import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = useSignup();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="sm:w-full md:w-1/2 ">
        <form
          onSubmit={HandleSubmit}
          className="flex flex-col gap-3 glass p-5 pb-6 rounded-lg "
        >
          <h2 className=" text-2xl font-bold text-primary pb-2">Sign Up</h2>
          <input
            type="text"
            name="fullname"
            value={inputs.fullname}
            onChange={HandleChange}
            placeholder="Full Name"
            className="input input-bordered"
          />
          <select
            name="gender"
            value={inputs.gender}
            onChange={HandleChange}
            className="select select-bordered "
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
              type="text"
              className="grow"
              name="email"
              value={inputs.email}
              onChange={HandleChange}
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
              name="password"
              value={inputs.password}
              onChange={HandleChange}
              className="grow"
              placeholder="Password"
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
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={HandleChange}
              className="grow"
              placeholder="Confirm Password"
            />
          </label>
          <div className="flex flex-col items-center w-full gap-2">
            <button
              type="submit"
              className="btn btn-wide btn-secondary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
            <Link
              to="/login"
              href="#"
              className="link link-primary text-sm hover:text-secondary hover:underline no-underline inline-block"
            >
              Already have an account? Click here{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
