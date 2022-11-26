import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const path = useNavigate();
  const hanldeSearch = (e) => {
    e.preventDefault();
    const keyWord = e.target.elements.search.value;
    e.target.elements.search.value = "";
    path(`/search-result/${keyWord}`);
  };

  return (
    <div className="card p-0 border-2 rounded-full w-1/2 mx-auto flex justify-between overflow-hidden">
      <form className="flex gap-5 items-center w-full" onSubmit={hanldeSearch}>
        <input
          name="search"
          className="input w-full py-3 px-5"
          type="text"
          placeholder="What do You Want to Search"
        />
        <button className="bg-gray-800 h-full px-3 text-xl font-semibold hover:bg-gray-700 simpleTransition">
          <BiSearchAlt2 className="buble" />
        </button>
      </form>
    </div>
  );
};

export default Searchbox;
