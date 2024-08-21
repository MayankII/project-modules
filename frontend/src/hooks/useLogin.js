import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState();
  const { setToken } = useAuthContext();
  const login = async ({ email, password }) => {
    const success = handleErrors({ email, password });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleErrors = ({ email, password }) => {
  if (!email || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
};
