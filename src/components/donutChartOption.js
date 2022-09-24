export const donutChartOption = ({ fontColor, label }) => {
  const donut = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: 60,
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#fff"],
      },
    },
    labels: [label],
    stroke: {
      lineCap: "round",
    },
    colors: [fontColor],
  };
  return donut;
};
