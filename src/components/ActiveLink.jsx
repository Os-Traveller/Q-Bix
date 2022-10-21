import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      style={{ width: "100%" }}
      className={`text-white text-sm block py-2 px-3 w-fit lg:w-full rounded-xl ${
        match ? "bg-[#1A1F37] font-semibold" : "text-gray-400"
      }`}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
