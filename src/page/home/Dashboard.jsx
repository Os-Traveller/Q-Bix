import React from "react";
import useGetUser from "../../hooks/useGetUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import StdDashboard from "./student/dashboard/StdDashboard";
import AdminDashboard from "./admin/dashboard/AdminDashboard";

const DashBoard = () => {
  const [userFirebase] = useAuthState(auth);
  const { data: user } = useGetUser(userFirebase?.email);
  if (user?.role === "student") {
    return <StdDashboard />;
  } else if (user?.role === "admin") {
    return <AdminDashboard />;
  }
};

export default DashBoard;
