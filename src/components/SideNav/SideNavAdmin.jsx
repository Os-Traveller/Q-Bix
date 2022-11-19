import React from "react";
import ActiveLink from "../../components/activeLink/ActiveLink";
import { FaHome } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useGetUser from "../../hooks/useGetUser";
import { useAuthState } from "react-firebase-hooks/auth";
import DpMaker from "../shared/DpMaker";
import Logo from "../shared/Logo";
import { colorRed } from "../styles/colors";

const SideNavAdmin = () => {
  const [userFirebase] = useAuthState(auth);
  const { data: user } = useGetUser(userFirebase?.email);

  return (
    <section className="card sideNav backdrop-filter-blur">
      {/* app name */}
      <Logo font={"30px"} hideText={true} />
      {/* --------------------- links start here --------------------- */}
      <div className="flex flex-col gap-3 mt-5">
        <div className="text-white">
          <div className="flex gap-3 mb-5">
            <DpMaker name={user?.name} fontSize="30px" color={colorRed} />
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
        {/* update result */}
        <ActiveLink to={"/update-result"}>
          <div className="flex gap-3 items-center">
            <div className="rounded-2xl bg-[#582CFF] p-2">
              <MdCollectionsBookmark className="text-lg" />
            </div>
            Update Result
          </div>
        </ActiveLink>
        {/* cources */}
      </div>
      {/* --------------------- links ends here --------------------- */}
      <button
        className="text-white rounded-lg flex gap-3 justify-center items-center py-3 px-5 font-semibold 
        mx-auto"
        style={{ background: colorRed }}
        onClick={() => signOut(auth)}
      >
        <CgLogOut />
        Log Out
      </button>
    </section>
  );
};

export default SideNavAdmin;
