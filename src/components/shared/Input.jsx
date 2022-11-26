import React from "react";
import { colorInput } from "../styles/colors";

const Input = ({ id, title, placeholder, type, name, readOnly, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold" htmlFor={id}>
        {title}
      </label>
      {readOnly ? (
        <input
          className="py-2 px-5 rounded-md shadow-md w-full"
          type={type}
          id={id}
          name={name}
          style={{ border: "1px solid white", backgroundColor: colorInput }}
          placeholder={placeholder}
          required
          readOnly
          value={value}
        />
      ) : (
        <input
          className="py-2 px-5 rounded-md shadow-md w-full"
          type={type}
          id={id}
          name={name}
          style={{ border: "1px solid white", backgroundColor: colorInput }}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};

export default Input;
