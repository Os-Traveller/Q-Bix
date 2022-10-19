import React from "react";

const Table = ({ data, attribute, title, color }) => {
  return (
    <div className="card">
      <h1
        className="text-center font-semibold text-2xl font-sans uppercase"
        style={{ letterSpacing: "5px" }}
      >
        {title}
      </h1>
      <table className="w-full mt-10">
        <thead className="border-y-[1px] border-gray-500 border-collapse">
          <tr className="text-gray-400 uppercase">
            {attribute?.map((singleAtt) => (
              <th className="py-2 font-semibold">{singleAtt}</th>
            ))}
          </tr>
        </thead>

        {data?.map((datam) => (
          <TableROw cols={datam} color={color} />
        ))}
      </table>
    </div>
  );
};

const TableROw = ({ cols, color }) => {
  console.log(cols);
  const { courseCode, courseTitle, credit, type, grade, final, mid, out30, total } = cols;
  return (
    <tr className="border-b-[1px] border-gray-500 border-collapse text-center">
      <td className="p-3">
        <button className="py-2 px-3 rounded-md mx-auto text-sm" style={{ backgroundColor: color }}>
          {courseCode}
        </button>
      </td>
      <td>{courseTitle}</td>
      <td>{credit}</td>
      <td>{type}</td>
      <td>{grade}</td>
      <td>{final}</td>
      <td>{mid}</td>
      <td>{out30}</td>
      <td>{total}</td>
    </tr>
  );
};

export default Table;
