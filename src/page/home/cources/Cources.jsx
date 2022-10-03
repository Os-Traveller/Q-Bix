import React from "react";
import profileBg from "../../../img/bgProfile.png";
import StatCard from "../../../components/StatCard";
import Table from "../../../components/Table";
import { bgImg } from "../../../components/styles";

const Cources = () => {
  const data = [
    {
      courseCode: "ACT 201",
      courseTitle: "Accounting Fundamental",
      credit: 2,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
    {
      courseCode: "CSE 205",
      courseTitle: "Digital Logic Design",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 33,
      mid: 24,
      out30: 29,
      total: 86,
    },
    {
      courseCode: "CSE 207",
      courseTitle: "Database Systems",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 24,
      out30: 29,
      total: 87,
    },
    {
      courseCode: "CSE 208",
      courseTitle: "Database Systems Lab",
      credit: 3,
      type: "Lab",
      grade: "A+",
      final: 37,
      mid: 23,
      out30: 27,
      total: 87,
    },
  ];
  const attribute = [
    "Course Code",
    "Course Title",
    "Credit",
    "Type",
    "Grade",
    "Final",
    "Mid",
    "Out of 30",
    "Total",
  ];
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
      <Table data={data} attribute={attribute} title="Summer - 2020" color="#48BB78" />
    </section>
  );
};

export default Cources;
