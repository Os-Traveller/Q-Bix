import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import bg from "../../img/background-body-admin.png";
import SideNav from "../../components/SideNav";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {}, [user]);

  return (
    <section className="page p-5" style={{ backgroundImage: `url(${bg})` }}>
      <SideNav />
      <div className="text-white overflow-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default Home;
