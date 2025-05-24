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
      console.error("Signup Error:", error);
      toast.error("Something went wrong during signup.");
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
        localStorage.setItem("customer", JSON.stringify(data.user));
        console.log(data.user);
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success(data.message);
        navigate("/verify2facode");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong during login.");
    } finally {
      setSubmitting(false);
    }
  };

  const verify2facode = async (formData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/auth/verify2facode`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const existingCustomer = JSON.parse(localStorage.getItem("customer")) || {};
        const updatedCustomer = { ...existingCustomer, ...data.user }; // Merge existing data with new data
        localStorage.setItem("customer", JSON.stringify(updatedCustomer));
        localStorage.getItem("customer")
        const loggedUser = JSON.parse( localStorage.getItem("customer"))
        const userId = loggedUser.id
        navigate(`/dashboard?userId=${userId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("2FA Verification Error:", error);
      toast.error("Invalid or Expired OTP.");
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login.");
        navigate("/login");
        return;
      }

      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      toast.success("See ya! Vault locked tight. 😉");
      localStorage.removeItem("customer");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong during logout.");
    } finally {
      setSubmitting(false);
    }
  };

  const setupAcc = async (formData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/account/create`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account successfully created.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Setup Account Error:", error);
      toast.error("Something went wrong during account setup.");
    } finally {
      setSubmitting(false);
    }
  };

  const value = {
    signup,
    login,
    verify2facode,
    logout,
    setupAcc,
    submitting,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
