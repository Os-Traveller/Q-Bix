import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import bg from "../../img/background-body-admin.png";
import SideNav from "../../components/SideNav/SideNav";
import auth from "../../firebase.init";
import useGetUser from "../../hooks/useGetUser";

const Home = () => {
  const [userfirebase] = useAuthState(auth);
  const { refetch: userRefetch } = useGetUser(userfirebase?.email);

  useEffect(() => {
    userRefetch();
  }, [userRefetch, userfirebase]);

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
