import { useState } from "react";
import { colorGray } from "../../styles/colors";

const Option = ({ title, name, values, setState, color }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="w-full">
      <h1 className="font-semibold mb-2">{title}</h1>
      <div
        className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
        style={{ backgroundColor: color ? color : colorGray }}
      >
        <select
          name={name}
          className="w-full outline-none"
          style={{ backgroundColor: color ? color : colorGray }}
          onChange={(e) => {
            setState(e.target.value);
            setSelected(true);
          }}
          required
        >
          {!selected && <option>Choose {title}</option>}

          {values?.map((value, index) => (
            <option key={index} className="uppercase" value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Option;
