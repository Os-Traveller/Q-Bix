import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SideNav from "../../components/SideNav";
import TopBar from "../../components/TopBar";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {}, [user]);
  return (
    <section className="p-5">
      <TopBar />
      <div className="page mt-5">
        <SideNav />
      </div>
    </section>
  );
};

export default Home;
