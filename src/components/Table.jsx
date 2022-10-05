import React from "react";

const Table = ({ data, attribute, title, color, full }) => {
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
          <TableROw cols={Object.values(datam)} color={color} full={full} />
        ))}
      </table>
    </div>
  );
};

const TableROw = ({ cols, color, full }) => {
  return (
    <tr className="border-b-[1px] border-gray-500 border-collapse text-center">
      {cols?.map((col, index) => (
        <td className="px-2 py-5 text-center font-semibold text-sm w-fit">
          <span style={{ display: index === 0 ? "none" : "block" }}>{col}</span>
          <button
            className="py-2 px-3 rounded-md mx-auto text-sm"
            style={{
              display: index === 0 ? "block" : "none",
              backgroundColor: color,
              width: full ? "100%" : "fit-content",
            }}
          >
            {col}
          </button>
        </td>
      ))}
    </tr>
  );
};

export default Table;
