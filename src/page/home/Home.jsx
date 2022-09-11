import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/SideNav";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {}, [user]);
  return (
    <section className="page p-3">
      <SideNav />
      <div className="text-white">
        <Outlet />
      </div>
    </section>
  );
};

export default Home;
