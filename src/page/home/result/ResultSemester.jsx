import React from "react";
import Table from "../../../components/Table";
import { colorGreen } from "../../../components/colors";
const ResultSemester = () => {
  const data = [
    {
      courseCode: "ACT 201",
      courseTitle: "Accounting Fundamental",
      credit: 2,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
    {
      courseCode: "CSE 205",
      courseTitle: "Digital Logic Design",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 33,
      mid: 24,
      out30: 29,
      total: 86,
    },
    {
      courseCode: "CSE 207",
      courseTitle: "Database Systems",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 24,
      out30: 29,
      total: 87,
    },
    {
      courseCode: "CSE 208",
      courseTitle: "Database Systems Lab",
      credit: 3,
      type: "Lab",
      grade: "A+",
      final: 37,
      mid: 23,
      out30: 27,
      total: 87,
    },
  ];
  const attribute = [
    "Course Code",
    "Course Title",
    "Credit",
    "Type",
    "Grade",
    "Final",
    "Mid",
    "Out of 30",
    "Total",
  ];

  return (
    <div>
      <Table attribute={attribute} data={data} color={colorGreen} title={"Summer - 2022"} />
    </div>
  );
};

export default ResultSemester;
