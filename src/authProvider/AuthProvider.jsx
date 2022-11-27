import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../toastConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  if (!user) {
    toast.warning("Login First", toastConfig);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProvider;
