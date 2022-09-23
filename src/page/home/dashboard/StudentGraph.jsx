import React from "react";
import Chart from "react-apexcharts";
import { areaChart } from "../../../components/areaChartOption";

const StudentGraph = () => {
  const fontColor = "white";
  const categories = [
    "summer-2020",
    "spring-2020",
    "fall-2020",
    "summer-2021",
    "spring-2021",
    "fall-2021",
    "summer-2022",
    "spring-2022",
    "fall-20202",
    "summer-2023",
    "spring-2023",
    "fall-2023",
  ];
  const cgpa = [3.23, 3.34, 3.54, 3.22, 3.6, 3.21, 3.43, 3.89, 3.76, 3.22, 3.98, 3.99];
  const sgpa = [3.23, 3.56, 3.89, 2.99, 3.89, 3.67, 2.56, 2.89, 4.0, 4.0, 4.0, 3.27];
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
        options={areaChart({ fontColor, bgColors: ["#2CD9FF", "#582CFF"], categories })}
      />
    </div>
  );
};

export default StudentGraph;
