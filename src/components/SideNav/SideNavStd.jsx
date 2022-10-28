import React from "react";
import ActiveLink from "../../components/activeLink/ActiveLink";
import { FaHome } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { BsFillCalendar2DayFill } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import myDp from "../../img/dp.jpg";
import useGetUser from "../../hooks/useGetUser";
import { useAuthState } from "react-firebase-hooks/auth";
import DpMaker from "../shared/DpMaker";
import Logo from "../shared/Logo";

const SideNavStd = () => {
  const [userFirebase] = useAuthState(auth);
  const { data: user } = useGetUser(userFirebase?.email);
  return (
    <section className="card sideNav backdrop-filter-blur">
      {/* app name */}
      <Logo font={"30px"} hideText={true} />
      {/* <h1 className="text-center text-white font-mono font-bold text-3xl mb-10">Q-Bix</h1> */}
      {/* --------------------- links start here --------------------- */}
      <div className="flex flex-col gap-3 mt-5">
        <div className="text-white">
          <div className="flex gap-3 mb-5">
            <DpMaker name={user?.name} fontSize="20px" img={myDp} />
            <div>
              <h1>{user?.name}</h1>
              <p className="text-gray-400 text-xs">
                {user?.email?.length > 25 ? user?.email?.slice(0, 22) + "..." : user?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-400 h-[1px] w-full"></div>
        {/* dashboard */}
        <ActiveLink to={"/"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <FaHome className="text-lg" />
            </div>
            Dashboard
          </div>
        </ActiveLink>
        {/* cources */}
        <ActiveLink to={"/courses"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <MdCollectionsBookmark className="text-lg" />
            </div>
            Courses
          </div>
        </ActiveLink>
        {/* Routine */}
        <ActiveLink to={"/routine"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <BsFillCalendar2DayFill className="text-lg" />
            </div>
            Routine
          </div>
        </ActiveLink>
        {/* Result */}
        <ActiveLink to={"/result"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <IoNewspaperSharp className="text-lg" />
            </div>
            Result
          </div>
        </ActiveLink>
        {/* Waiver */}
        <ActiveLink to={"/fees"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <RiMoneyPoundBoxFill className="text-lg" />
            </div>
            Fees
          </div>
        </ActiveLink>
      </div>
      {/* --------------------- links ends here --------------------- */}
      <button
        className="bg-red-500 text-white rounded-lg flex gap-3 justify-center items-center py-3 px-5 font-semibold 
        mx-auto"
        onClick={() => signOut(auth)}
      >
        <CgLogOut />
        Log Out
      </button>
    </section>
  );
};

export default SideNavStd;
