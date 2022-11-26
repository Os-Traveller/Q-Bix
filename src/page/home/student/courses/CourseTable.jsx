import React from "react";
import { colorGreen } from "../../../../components/styles/colors";

const CourseTable = ({ courses, semester }) => {
  console.log(courses);
  return (
    <section>
      <div className="card">
        <h2 className="text-xl w-fit font-semibold font-sans uppercase">{semester}</h2>
        <table className="w-full mt-10">
          <thead className="uppercase text-sm text-gray-400">
            <tr>
              <th className="px-2 pb-3">Course Title</th>
              <th className="px-2 pb-3">Course Code</th>
              <th className="px-2 pb-3">Credit</th>
              <th className="px-2 pb-3">Type</th>
              <th className="px-2 pb-3">Out Of 30</th>
              <th className="px-2 pb-3">Mid</th>
              <th className="px-2 pb-3">Final</th>
              <th className="px-2 pb-3">Total</th>
              <th className="px-2 pb-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course, index) => (
              <Row
                key={index}
                title={course?.title}
                code={course?.code}
                credit={course?.credit}
                type={course?.type}
                final={course?.final}
                mid={course?.mid}
                out30={course.out30}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Row = ({ title, code, credit, type, mid, out30, final, grade, total }) => {
  return (
    <tr className="w-full border-t text-center">
      <td className="px-3 py-5">
        <button
          className="py-1 px-3 rounded-md uppercase mx-auto"
          style={{ background: colorGreen, display: code ? "block" : "none" }}
        >
          {code}
        </button>
      </td>
      <td className="px-3 py-5">{title}</td>
      <td className="px-3 py-5">{credit}</td>
      <td className="px-3 py-5 capitalize">{type}</td>
      <td className="px-3 py-5">{out30 ? out30 : "***"}</td>
      <td className="px-3 py-5">{mid ? mid : "***"}</td>
      <td className="px-3 py-5">{final ? final : "***"}</td>
      <td className="px-3 py-5">{total ? total : "***"}</td>
      <td className="px-3 py-5">{grade ? grade : "***"}</td>
    </tr>
  );
};

export default CourseTable;
