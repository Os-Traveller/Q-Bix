export const areaChart = ({ fontColor, bgColors, categories }) => {
  return {
    title: {
      text: "Evaluation Graph",
      style: { fontSize: 18, color: fontColor },
    },
    min: 0,
    max: 4,
    tooltip: {
      theme: "dark",
    },
    colors: bgColors,
    stroke: { width: 4, curve: "smooth" },

    xaxis: {
      labels: {
        style: {
          colors: fontColor,
        },
      },
      title: { text: "Semester", style: { fontSize: 18, color: fontColor } },
      categories: categories,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        // gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#2CD9FF", "#582CFF"],
    },
    colors: ["#2CD9FF", "#582CFF"],
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    yaxis: {
      labels: {
        style: {
          colors: fontColor,
        },
      },
      title: {
        style: { fontSize: 18, color: fontColor },
      },
    },
  };
};
