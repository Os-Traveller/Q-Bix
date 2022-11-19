import React from "react";
import { Outlet } from "react-router-dom";
import ActiveLinkResult from "../../../../components/activeLink/ActiveLinkResult";

const Result = () => {
  return (
    <>
      <div className="flex gap-3 flex-wrap justify-end mb-10">
        <ActiveLinkResult to={"/result"}>Current Semester</ActiveLinkResult>
        <ActiveLinkResult to={"all"}>All</ActiveLinkResult>
        <ActiveLinkResult to={"retake"}>Retake</ActiveLinkResult>
      </div>
      <Outlet />
    </>
  );
};

export default Result;
