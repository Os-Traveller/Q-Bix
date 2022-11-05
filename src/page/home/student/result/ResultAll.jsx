import React from "react";
import CourseTable from "../courses/CourseTable";

const ResultAll = () => {
  const data = [
    {
      courseCode: "CSE 111",
      courseTitle: "Structured Programming Language",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
    {
      courseCode: "ENG 101",
      courseTitle: "English Language-I",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
    {
      courseCode: "CSE 111",
      courseTitle: "Structured Programming Language",
      credit: 3,
      type: "Theory",
      grade: "A+",
      final: 34,
      mid: 22.5,
      out30: 25.5,
      total: 82,
    },
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

  return (
    <div>
      <CourseTable courses={data} />
    </div>
  );
};

export default ResultAll;
