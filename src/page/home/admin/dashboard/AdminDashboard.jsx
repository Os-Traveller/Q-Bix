import React from "react";
import Searchbox from "../../../../components/shared/search/Searchbox";
import ControlCenter from "./ControlCenter";
import UniversityInfo from "./UniversityInfo";

const AdminDashboard = () => {
  return (
    <section className="">
      <Searchbox />
      <div className="mt-5"></div>
      <UniversityInfo />
      <div className="mt-5"></div>
      <ControlCenter />
    </section>
  );
};

export default AdminDashboard;
