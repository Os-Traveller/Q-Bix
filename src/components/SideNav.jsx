import React from "react";
import ActiveLink from "./ActiveLink";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { BiCalendarEvent } from "react-icons/bi";
import { TbFileAnalytics } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DpMaker from "./DpMaker";
import { signOut } from "firebase/auth";

const SideNav = () => {
  const [user] = useAuthState(auth);
  return (
    <section className="bg-[#212130] p-5 rounded-2xl sideNav backdrop-filter-blur opacity-80">
      {/* app name */}
      <h1 className="text-center text-white font-mono font-bold text-3xl mb-10">Q-Bix</h1>
      {/* --------------------- links start here --------------------- */}
      <div className="flex flex-col gap-3">
        <div className="text-white">
          <div className="flex gap-3 mb-5">
            <DpMaker name={user?.displayName} fontSize="20px" img={user?.photoURL} />
            <div>
              <h1>{user?.displayName}</h1>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-400 h-[1px] w-full"></div>
        {/* dashboard */}
        <ActiveLink to={"/"}>
          <div className="flex gap-3 items-center">
            <MdOutlineSpaceDashboard className="text-xl" />
            Dashboard
          </div>
        </ActiveLink>
        {/* cources */}
        <ActiveLink to={"/cources"}>
          <div className="flex gap-3 items-center">
            <FiBook className="text-xl" />
            Cources
          </div>
        </ActiveLink>
        {/* Routine */}
        <ActiveLink to={"/routine"}>
          <div className="flex gap-3 items-center">
            <BiCalendarEvent className="text-xl" />
            Routine
          </div>
        </ActiveLink>
        {/* Result */}
        <ActiveLink to={"/result"}>
          <div className="flex gap-3 items-center">
            <TbFileAnalytics className="text-xl" />
            Result
          </div>
        </ActiveLink>
        {/* Waiver */}
        <ActiveLink to={"/waiver"}>
          <div className="flex gap-3 items-center">
            <RiMoneyDollarBoxLine className="text-xl" />
            Waiver and Fees
          </div>
        </ActiveLink>
      </div>
      {/* --------------------- links ends here --------------------- */}
      <button
        className="bg-red-500 text-white rounded-xl flex gap-3 justify-center items-center 
      py-3 px-5 font-semibold mx-auto"
        onClick={() => signOut(auth)}
      >
        <CgLogOut />
        Log Out
      </button>
    </section>
  );
};

export default SideNav;
