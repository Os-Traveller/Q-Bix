import React from "react";
import Chart from "react-apexcharts";
import { donutChartOption } from "./donutChartOption";

const StatCard = ({ title, completed, total, fontColor }) => {
  const size = parseInt((completed * 100) / total);
  return (
    <div className="card opacity-70 w-fit flex-grow">
      <h1 className="text-2xl text-center mb-5">{title}</h1>
      <div className="flex gap-5 w-fit mx-auto">
        {/* details */}
        <div>
          {/* detail -1 */}
          <div className="card bg-[#02051b] text-center">
            <h2 className="text-gray-400 mb-2">Total {title}</h2>
            <p className="text-xl font-semibold">{total}</p>
          </div>
          {/* detail - 2 */}
          <div>
            <div className="card bg-[#02051b] text-center mt-5">
              <h2 className="text-gray-400 mb-2">Completed {title}</h2>
              <p className="text-xl font-semibold">{completed}</p>
            </div>
          </div>
        </div>
        <div>
          <Chart
            type="radialBar"
            width={200}
            height={300}
            series={[size]}
            options={donutChartOption({ fontColor, label: title })}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
