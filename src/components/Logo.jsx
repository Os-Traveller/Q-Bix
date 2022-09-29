import React from "react";

const Logo = ({ font, hideText }) => {
  return (
    <section className="text-white mx-auto p-5">
      <h1 className="logo text-center" style={{ fontSize: font }}>
        Q-Bix
      </h1>
      <p
        style={{ display: hideText ? "none" : "block", letterSpacing: "5px" }}
        className="logoText text-2xl mt-2"
      >
        Perfectly Ogranized As Everything Should Be
      </p>
    </section>
  );
};

export default Logo;
