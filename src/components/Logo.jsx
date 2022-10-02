import React from "react";

const Logo = ({ font, hideText }) => {
  return (
    <section className="text-white mx-auto py-2 px-5">
      <h1 className="logo text-center" style={{ fontSize: font }}>
        Q-Bix
      </h1>
      <p
        style={{ display: hideText ? "none" : "block", letterSpacing: "5px" }}
        className="logoText text-2xl mt-2 text-center"
      >
        Perfectly Ogranized As Everything Should Be
      </p>
    </section>
  );
};

export default Logo;
