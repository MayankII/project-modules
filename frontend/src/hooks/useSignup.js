import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [loading, setLoading] = useState(null);
  const { setToken } = useAuthContext();
  const signup = async ({
    fullname,
    email,
    gender,
    password,
    confirmPassword,
  }) => {
    const success = handleErrors({
      fullname,
      email,
      gender,
      password,
      confirmPassword,
    });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          gender,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

const handleErrors = ({
  fullname,
  email,
  gender,
  password,
  confirmPassword,
}) => {
  if (!fullname || !email || !gender || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  return true;
};
