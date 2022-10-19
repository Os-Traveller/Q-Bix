import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { colorGreen } from "./colors";

const ActiveLinkResult = ({ to, children }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      style={{ backgroundColor: match ? colorGreen : "" }}
      className={`text-white block py-3 px-5 w-fit rounded-xl bg-[#1A1F37] ${
        match ? "font-semibold" : ""
      }`}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLinkResult;
