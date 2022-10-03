import React from "react";
import Table from "../../../components/Table";

const ClassRoutine = () => {
  const timeAndDate = [
    "Date & Time",
    "8.30 AM - 10.00 AM",
    "10.00 AM - 11.30 AM",
    "11.30 AM - 1.00 PM",
    "1.20 PM - 2.50 PM",
  ];
  const data = [
    {
      1: "SATURDAY",
      2: "",
      3: `CSE 209 
      FC: DMRI
      B:1 => R:901`,
      4: `CSE 322
      FC: MMFR
      B:1 => R:901`,
      5: `CSE 322 
      FC: MMFR 
      B:1 => R:901`,
    },
    {
      1: "SUNDAY",

      2: `CSE 209 
      FC: DMRI
      B:1 => R:901`,
      3: `CSE 322
      FC: MMFR
      B:1 => R:901`,
      4: `CSE 322 
      FC: MMFR 
      B:1 => R:901`,
      5: "",
    },
  ];
  return (
    <div>
      <Table
        attribute={timeAndDate}
        data={data}
        title="Class Routine"
        color="#e67e22 "
        full={true}
      />
    </div>
  );
};

export default ClassRoutine;
