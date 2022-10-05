import React from "react";
import { Outlet } from "react-router-dom";

const Result = () => {
  return (
    <>
      <div className="flex gap-5 flex-wrap justify-end">
        <button className="card px-5 py-4 uppercase w-fit">Semester Wise Result</button>
        <button className="card px-5 py-4 uppercase w-fit">All Published</button>
        <button className="card px-5 py-4 uppercase w-fit">Upcoming Result</button>
        <button className="card px-5 py-4 uppercase w-fit">Retake</button>
        <button className="card px-5 py-4 uppercase w-fit">Pending</button>
        <button className="card px-5 py-4 uppercase w-fit">Incomplete</button>
      </div>
      <Outlet />
    </>
  );
};

export default Result;
