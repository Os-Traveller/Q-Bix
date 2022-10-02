import React from "react";

const Table = () => {
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
  return (
    <div className="card">
      <h1 className="text-center font-semibold text-2xl">Summer - 2022</h1>
      <table className="w-full mt-10 ">
        <thead className="border-b-[1px] border-gray-500 border-collapse">
          <tr className="text-gray-400 text-left uppercase">
            <th className="px-2">Course Code</th>
            <th>Course Title</th>
            <th>Credit</th>
            <th>Type</th>
            <th>Grade</th>
            <th>Final</th>
            <th>Mid</th>
            <th>Out of 30</th>
            <th>Total</th>
          </tr>
        </thead>
        {data.map((datam) => (
          <TableROw cols={Object.values(datam)} />
        ))}
      </table>
    </div>
  );
};

const TableROw = ({ cols }) => {
  return (
    <tr className="border-b-[1px] border-gray-500 border-collapse">
      {cols.map((col, index) => (
        <td className="px-2 py-5">
          <span style={{ display: index === 0 ? "none" : "block" }}>{col}</span>
          <button
            className="bg-[#48BB78] pt-1 px-2 rounded-md"
            style={{ display: index === 0 ? "block" : "none" }}
          >
            {col}
          </button>
        </td>
      ))}
    </tr>
  );
};

export default Table;
