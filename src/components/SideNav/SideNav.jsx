import React from "react";
import SideNavStd from "./SideNavStd";
import useGetUser from "../../hooks/useGetUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import SideNavAdmin from "./SideNavAdmin";

const SideNav = () => {
  const [userfirebase] = useAuthState(auth);
  const { data: user } = useGetUser(userfirebase?.email);

  if (user?.role === "student") {
    return <SideNavStd />;
  } else if (user?.role === "admin") {
    return <SideNavAdmin />;
  }
};

export default SideNav;
