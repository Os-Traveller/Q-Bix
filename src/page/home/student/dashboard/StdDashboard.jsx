import React from "react";
import StdProfile from "./StdProfile";
import StdProfileInfo from "./StdProfileInfo";
import StudentGraph from "./StudentGraph";

const StdDashboard = () => {
  return (
    <div>
      <StdProfile />
      <div className="mt-5"></div>
      <StdProfileInfo />
      <div className="mb-5"></div>
      <StudentGraph />
    </div>
  );
};

export default StdDashboard;
