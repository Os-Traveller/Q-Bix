import React from "react";
import myDp from "../../../img/dp.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import DpMaker from "../../../components/DpMaker";
import {MdOutlineEdit} from "react-icons/md";
const Profile = () => {
  const [user] = useAuthState(auth);
  const width = "300px";
  console.log();
  return (
    <div className="card relative">
      <div className="bg-[#E6E6E6] h-[180px] rounded-t-xl"></div>
      <div className="flex justify-between">
      
      <div className="toUp">
        <DpMaker img={myDp} name={user?.displayName} height="200px"/>
      </div>
      <div className="w-[50%]"></div>
      <div className="flex justify-between w-full py-5">
        <div>
        <h1 className="text-3xl font-semibold">{user?.displayName}</h1>
        </div>
        
          
        <button className="btn bg-blue-600 w-fit rounded-xl flex gap-2 items-center"><MdOutlineEdit/> Edit Profile</button>


        


      </div>
      </div>
    </div>
  );
};

export default Profile;
