import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useAuthState } from "react-firebase-hooks/auth";
import { areaChart } from "../../../../components/styles/areaChartOption";
import { serverAddress } from "../../../../components/variables";
import auth from "../../../../firebase.init";
import Student from "../../../../js/student";

const StudentGraph = () => {
  const [courses, setCourses] = useState({});
  const [userFirebase] = useAuthState(auth);

  const std = new Student({ email: userFirebase?.email });

  useEffect(() => {
    const url = `${serverAddress}/all-course/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, [userFirebase]);

  const { cgpa, sgpa, semesterList } = std.collectionCgpaSgpa({ courses });

  const fontColor = "white";

  return (
    <div className="card backdrop-filter-blur">
      <Chart
        type="area"
        width={"100%"}
        height={"500px"}
        series={[
          { name: "CGPA", data: cgpa },
          { name: "SGPA", data: sgpa },
        ]}
        options={areaChart({
          fontColor,
          bgColors: ["#2CD9FF", "#582CFF"],
          categories: semesterList,
        })}
      />
    </div>
  );
};

export default StudentGraph;
