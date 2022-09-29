import React from "react";

const Input = ({ id, title, placeholder, type, name }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id}>{title}</label>
      <input
        className="bg-[#131536] py-2 px-5 rounded-xl shadow-md w-full"
        type={type}
        id={id}
        name={name}
        style={{ border: "1px solid white" }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
