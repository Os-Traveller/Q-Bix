export const donutChartOption = ({ fontColor, label }) => {
  const donut = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: 50,
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
