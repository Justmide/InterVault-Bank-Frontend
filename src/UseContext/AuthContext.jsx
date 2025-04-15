import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const signup = async (formData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        navigate("/VerifyAccount");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.message("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const login = async (formData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
        navigate("/ProfileSettings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const value = {
    signup,
    login,
    submitting,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
