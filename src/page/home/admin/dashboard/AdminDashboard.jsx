import React from "react";
import Searchbox from "../../../../components/shared/search/Searchbox";
import UniversityInfo from "./UniversityInfo";

const AdminDashboard = () => {
  return (
    <section className="">
      <Searchbox />
      <div className="mt-5"></div>
      <UniversityInfo />
    </section>
  );
};

export default AdminDashboard;
