import React from "react";
import { colorGreen } from "../../../../components/styles/colors";

const CourseTable = ({ courses }) => {
  return (
    <section>
      <div className="card">
        <h2 className="text-xl w-fit font-semibold font-sans uppercase">Summer : 2022</h2>
        <table className="w-full mt-10">
          <thead className="uppercase text-sm text-gray-400">
            <td className="px-2 pb-3">Course Title</td>
            <td className="px-2 pb-3">Course Code</td>
            <td className="px-2 pb-3">Credit</td>
            <td className="px-2 pb-3">Type</td>
            <td className="px-2 pb-3">Out Of 30</td>
            <td className="px-2 pb-3">Mid</td>
            <td className="px-2 pb-3">Final</td>
            <td className="px-2 pb-3">Total</td>
            <td className="px-2 pb-3">Grade</td>
          </thead>
          {courses.map((course, index) => (
            <Row
              key={index}
              title={course.title}
              code={course.code}
              credit={course.credit}
              type={course.type}
              final={course.final}
              mid={course.mid}
              out30={course.out30}
              total={course.total}
              grade={course.grade}
            />
          ))}
        </table>
      </div>
    </section>
  );
};

const Row = ({ title, code, credit, type, grade, final, mid, out30, total }) => {
  return (
    <tr className="w-full border-t">
      <td className="px-3 py-5 uppercase">
        <button
          className="py-1 px-3 rounded-md"
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
