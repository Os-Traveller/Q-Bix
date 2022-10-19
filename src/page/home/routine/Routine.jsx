import React from "react";
import Calander from "./Calander";
import ClassRoutine from "./ClassRoutine";

const Routine = () => {
  return (
    <div>
      <ClassRoutine />
      <div className="my-8"></div>
      <Calander/>
    </div>
  );
};

export default Routine;
 