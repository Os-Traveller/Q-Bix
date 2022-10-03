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
        <thead className="border-b-[1px] border-gray-500 border-collapse">
          <tr className="text-gray-400 text-left uppercase">
            {attribute?.map((singleAtt) => (
              <th className="px-2">{singleAtt}</th>
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
    <tr className="border-b-[1px] border-gray-500 border-collapse">
      {cols?.map((col, index) => (
        <td className="px-2 py-5">
          <span style={{ display: index === 0 ? "none" : "block" }}>{col}</span>
          <button
            className="pt-1 px-2 rounded-md w-full w-fi"
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
