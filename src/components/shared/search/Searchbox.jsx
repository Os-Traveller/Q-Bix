import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
const Searchbox = () => {
  const hanldeSearch = (e) => {
    e.preventDefault();
    const content = e.target.elements.search.value;
    console.log(content);
  };
  return (
    <div className="card p-0 border-2 rounded-full w-1/2 mx-auto flex justify-between overflow-hidden">
      <form className="flex gap-5 items-center py-3 px-5 w-full" onSubmit={hanldeSearch}>
        <input
          name="search"
          className="input w-full"
          type="text"
          placeholder="What do You Want to Search"
        />
      </form>
      <button className="bg-gray-800 px-3 text-xl font-semibold hover:bg-gray-700 simpleTransition">
        <BiSearchAlt2 />
      </button>
    </div>
  );
};

export default Searchbox;
