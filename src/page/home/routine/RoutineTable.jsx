import React from "react";

const RoutineTable = ({ data, attribute, title, color }) => {
  return (
    <div className="card">
      <h1
        className="text-center font-semibold text-2xl font-sans uppercase border-b-2 w-fit mx-auto"
        style={{ letterSpacing: "5px" }}
      >
        {title}
      </h1>
      <table className="w-full mt-14">
        <thead className="border-[1px] border-gray-500 border-collapse">
          <tr className="text-gray-400 uppercase">
            <th className="py-4">
              <span>DATE & TIME</span>
            </th>
            {attribute?.map((singleAtt) => (
              <th className="py-4">
                <span>{singleAtt}</span>
              </th>
            ))}
          </tr>
        </thead>

        {data?.map((datam, index) => (
          <TableROw cols={datam} key={index} />
        ))}
      </table>
    </div>
  );
};

const TableROw = ({ cols }) => {
  return (
    <tr className="border-b-[1px] border-gray-500 border-collapse text-center text-sm h-[100px]">
      {cols?.map((col) => (
        <td className="px-1 py-5 text-center border-x-[1px]">{col}</td>
      ))}
    </tr>
  );
};

export default RoutineTable;
