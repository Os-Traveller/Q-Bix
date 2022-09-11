import React from "react";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      style={{ width: "100%" }}
      className={({ isActive }) =>
        (isActive ? "bg-[#3C2E67] font-semibold" : "text-gray-400") +
        " text-white block py-3 px-5 w-full rounded-xl "
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
