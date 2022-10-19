import React from "react";
import { Outlet } from "react-router-dom";
import ActiveLinkResult from "../../../components/ActiveLinkResult";

const Result = () => {
  return (
    <>
      <div className="flex gap-3 flex-wrap justify-end mb-10">
        <ActiveLinkResult to={"/result"}>All</ActiveLinkResult>
        <ActiveLinkResult to={"semester"}>Semester Wise Result</ActiveLinkResult>
        <ActiveLinkResult to={"upcoming"}>Upcoming Cources</ActiveLinkResult>
        <ActiveLinkResult to={"retake"}>Retake</ActiveLinkResult>
      </div>
      <Outlet />
    </>
  );
};

export default Result;
