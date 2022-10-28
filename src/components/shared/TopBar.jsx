import React from "react";
import { CgSearch } from "react-icons/cg";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";

const TopBar = () => {
  return (
    <section className="flex justify-between items-center w-full">
      <h1 className="font-mono text-white text-3xl">Q-Bix</h1>
      <form className="bg-[#212130] min-w-[300px] px-3 py-2 rounded-md flex justify-between items-center">
        <input
          className="bg-transparent outline-none text-white"
          type="text"
          placeholder="Search Here"
        />
        <button>
          <CgSearch className="text-2xl text-white" />
        </button>
      </form>
      <div>
        <button
          className="text-white bg-red-500 btn rounded-lg simpleTransition hover:bg-red-700"
          onClick={() => signOut(auth)}
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default TopBar;
