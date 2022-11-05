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
import { useState } from "react";
import { useEffect } from "react";
import CourseTable from "./CourseTable";
import { serverAddress } from "../../../../components/varables";
import useGetUser from "../../../../hooks/useGetUser";

const Courses = () => {
  const [userFirebase] = useAuthState(auth);
  const path = useNavigate();
  const [regStatus, setRegStatus] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data: userData, refetch } = useGetUser(userFirebase?.email);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [takenCourse, setTakenCourse] = useState(0);
  const [takenCredit, setTakenCredit] = useState(0);

  useEffect(() => {
    const url = `${serverAddress}/registered/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setRegStatus(res));
  }, [userFirebase]);

  useEffect(() => {
    const url = `${serverAddress}/current-course/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, [userFirebase]);

  useEffect(() => {
    refetch();
    const url = `${serverAddress}/course-ratio/${userData?.dept}/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setTotalCourse(res.totalCourseCount);
        setTakenCourse(res.stdTotalCourseCount);
        setTotalCredit(res.totalCredit);
        setTakenCredit(res.stdTotalCredit);
      });
  }, [userFirebase, refetch, userData]);

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
        <StatCard
          title={"Cources"}
          completed={takenCourse}
          total={totalCourse}
          fontColor={"#582CFF"}
        />
        <StatCard
          title={"Credit"}
          completed={takenCredit}
          total={totalCredit}
          fontColor={"#08987B"}
        />
      </div>
      {/* presrnt cources */}
      {courses.length !== 0 && <CourseTable courses={courses} />}
    </section>
  );
};

export default Courses;
