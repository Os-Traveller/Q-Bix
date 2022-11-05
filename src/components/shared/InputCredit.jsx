import React from "react";
import { colorGray } from "../styles/colors";

const InputCredit = ({ id, type, title, state, setState, detail, width, readOnly }) => {
  return (
    <div className="w-full flex items-end">
      <label className="my-2 block w-[30%]" htmlFor={id} style={{ width: width }}>
        <span className="font-semibold block">{title}</span>
        <span className="text-sm text-gray-400 mt-1">{detail}</span>
      </label>
      {readOnly ? (
        <input
          className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md cursor-not-allowed"
          style={{ backgroundColor: colorGray }}
          id={id}
          type={type}
          placeholder={state ? "" : detail}
          value={state}
          onChange={(e) => setState(e.target.value)}
          readOnly
        />
      ) : (
        <input
          className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
          style={{ backgroundColor: colorGray }}
          id={id}
          type={type}
          placeholder={state ? "" : detail}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputCredit;
