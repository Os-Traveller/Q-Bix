import React from "react";
import Profile from "./Profile";
import StudentGraph from "./StudentGraph";

const Dashboard = () => {
  return (
    <div>
      <Profile />
      <div className="mb-5"></div>
      <StudentGraph />
    </div>
  );
};

export default Dashboard;
