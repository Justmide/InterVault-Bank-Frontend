import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import React, { useEffect } from "react";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("customer"));
    const token = localStorage.getItem("token");

    if (!users || !token) {
      toast.error("You need to login to access this page");
      navigate("/login");
    }
  }, [navigate]);

  const users = JSON.parse(localStorage.getItem("customer"));
  const token = localStorage.getItem("token");

  if (!users|| !token) return null;

  return <Outlet />;
};

export default ProtectedRoute;
