export const bgImg = (url) => {
  return {
    backgroundImage: `url(${url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
};
