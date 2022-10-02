import React from "react";
import profileBg from "../../../img/bgProfile.png";
import StatCard from "../../../components/StatCard";
import Table from "../../../components/Table";
import { bgImg } from "../../../components/styles";

const Cources = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-5">
        <div className="card w-fit flex-grow" style={{ ...bgImg(profileBg) }}>
          <h1 className="text-2xl">Welcome Back!</h1>
          <p className="mt-2">
            Nice to see you, <span className="text-xl font-bold font-mono">{"Faisal Ahmed"}</span>
          </p>
        </div>
        <StatCard title={"Cources"} completed={30} total={120} fontColor={"#582CFF"} />
        <StatCard title={"Credit"} completed={52.5} total={130} fontColor={"#08987B"} />
      </div>
      {/* presrnt cources */}
      <Table />
    </section>
  );
};

export default Cources;
