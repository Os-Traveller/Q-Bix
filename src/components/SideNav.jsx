import React from "react";
import ActiveLink from "./ActiveLink";
import { FaHome } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { BsFillCalendar2DayFill } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DpMaker from "./DpMaker";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import myDp from "../img/dp.jpg";

const SideNav = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    document.title = `${user?.displayName}'s Profile`;
  }, [user]);
  return (
    <section className="card sideNav backdrop-filter-blur">
      {/* app name */}
      <h1 className="text-center text-white font-mono font-bold text-3xl mb-10">Q-Bix</h1>
      {/* --------------------- links start here --------------------- */}
      <div className="flex flex-col gap-3">
        <div className="text-white">
          <div className="flex gap-3 mb-5">
            <DpMaker name={user?.displayName} fontSize="20px" img={myDp} />
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
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <FaHome className="text-xl" />
            </div>
            Dashboard
          </div>
        </ActiveLink>
        {/* cources */}
        <ActiveLink to={"/cources"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <MdCollectionsBookmark className="text-xl" />
            </div>
            Cources
          </div>
        </ActiveLink>
        {/* Routine */}
        <ActiveLink to={"/routine"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <BsFillCalendar2DayFill className="text-xl" />
            </div>
            Routine
          </div>
        </ActiveLink>
        {/* Result */}
        <ActiveLink to={"/result"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <IoNewspaperSharp className="text-xl" />
            </div>
            Result
          </div>
        </ActiveLink>
        {/* Waiver */}
        <ActiveLink to={"/waiver"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <RiMoneyPoundBoxFill className="text-xl" />
            </div>
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
