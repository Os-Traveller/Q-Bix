import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// images
import cardBg from "../../../../img/cardBG.png";
// components
import { bgImg } from "../../../../components/styles/styles";
import StatCard from "../../../../components/shared/StatCard";
import auth from "../../../../firebase.init";
import { colorGreen, colorRed } from "../../../../components/styles/colors";
import Student from "../../../../js/Student";
import { useState } from "react";
import { useEffect } from "react";
import CourseTable from "./CourseTable";
import { serverAddress } from "../../../../components/varables";

const Courses = () => {
  const [userFirebase] = useAuthState(auth);
  const path = useNavigate();

  const data = [
    {
      code: "ACT 201",
      title: "Accounting Fundamental",
      credit: 2,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
    {
      code: "CSE 205",
      title: "Digital Logic Design",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 33,
      mid: 24,
      out30: 29,
      total: 86,
    },
    {
      code: "CSE 207",
      title: "Database Systems",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 24,
      out30: 29,
      total: 87,
    },
    {
      code: "CSE 208",
      title: "Database Systems Lab",
      credit: 3,
      type: "Lab",
      grade: "A+",
      final: 37,
      mid: 23,
      out30: 27,
      total: 87,
    },
  ];

  const std = new Student({ email: userFirebase?.email });
  const [regStatus, setRegStatus] = useState(false);

  useEffect(() => {
    const url = `${serverAddress}/registered/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setRegStatus(res));
  }, [userFirebase]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-5">
        <div
          className="card w-fit flex-grow flex flex-col justify-between"
          style={{ ...bgImg(cardBg) }}
        >
          <div>
            <h1 className="text-2xl">Welcome Back!</h1>
            <p className="mt-2">
              Nice to see you,{" "}
              <span className="text-xl font-bold font-mono">{userFirebase?.displayName}</span>
            </p>
          </div>
          {regStatus ? (
            <h2
              className="text-lg btn rounded-lg w-fit cursor-not-allowed mx-auto"
              style={{ background: colorRed }}
            >
              You are Already Registered
            </h2>
          ) : (
            <button
              className="btn rounded-lg w-fit ml-auto"
              style={{ backgroundColor: colorGreen }}
              onClick={() => path("/registration")}
            >
              Registration
            </button>
          )}
        </div>
        <StatCard title={"Cources"} completed={30} total={120} fontColor={"#582CFF"} />
        <StatCard title={"Credit"} completed={52.5} total={130} fontColor={"#08987B"} />
      </div>
      {/* presrnt cources */}
      <CourseTable courses={data} />
    </section>
  );
};

export default Courses;
