import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { GrGoogle } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
import auth from "../../firebase.init";
import Input from "../../components/Input";
import IconCover from "../../components/IconCover";
import Logo from "../../components/Logo";
import { bgImg } from "../../components/styles";
import bgAuth from "../../img/bgAuth.png";

const Signup = () => {
  const path = useNavigate();

  const radious = "35px";
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const name = e.target.elements.name.value;
    const password = e.target.elements.password.value;
    console.log(name, email);
    createUserWithEmailAndPassword(email, password).then(() => {
      updateProfile({ displayName: name });
      path("/");
    });
  };

  return (
    <section className="bg-[#0B0F33] h-screen flex">
      <div className="w-[60%] centerXY lg:flex hidden" style={{ ...bgImg(bgAuth) }}>
        <Logo font={"50px"} />
      </div>
      <div className="md:p-32 p-10 lg:w-1/2 w-full flex justify-center md:justify-start items-center text-white">
        <form className="w-fit" onSubmit={handleSignup}>
          <h2 className="text-3xl font-semibold">Welcome</h2>
          <p className="text-gray-400 mt-2">Enter Your Email and Password to Sign In</p>
          <div className="flex gap-5 mt-5">
            <IconCover icon={<GrGoogle />} radious={radious} />
            <IconCover icon={<BsFacebook />} radious={radious} />
            <IconCover icon={<BsGithub />} radious={radious} />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex gap-4">
              <Input title="Name" placeholder="Your Name" name="name" type="text" />
              <Input title="ID" placeholder="Your Id" name="id" type="number" />
            </div>
            <div>
              <h2>Your Role</h2>

              <div
                className="mt-3 py-2 px-5 bg-[#131536] rounded-xl shadow-md w-full"
                style={{ border: "1px solid white" }}
              >
                <select
                  name="role"
                  className="bg-[#131536] w-full outline-none text-gray-400"
                  required
                >
                  <option value="role">What's Your Role?</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            <Input title="Email" placeholder="Your email adress" name="email" type="email" />
            <Input title="Password" placeholder="Your password" name="password" type="password" />

            <button className="btn mt-5 bg-[#542DE1] rounded-xl uppercase">Sign Up</button>

            <p className="text-gray-400 font-semibold text-center">
              Already have an Account?{" "}
              <span
                className="text-white font-semibold cursor-pointer"
                onClick={() => path("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );

  // const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth);
  // const [updateProfile] = useUpdateProfile(auth);
  // const path = useNavigate();

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   const email = e.target.elements.email.value;
  //   const name = e.target.elements.name.value;
  //   const password = e.target.elements.password.value;
  //   console.log(name, email);
  //   createUserWithEmailAndPassword(email, password).then(() => {
  //     updateProfile({ displayName: name }).then(console.log(user?.displayName));
  //     path("/");
  //   });
  // };

  // return (
  //   <section className="flex justify-center items-center h-screen linerBg">
  //     <div
  //       className="w-[800px] mx-auto rounded-xl overflow-hidden border-gray-600 border-[1px] shadow-md
  //     shadow-[#171520] flex"
  //     >
  //       <div className="lingerBgSingupLoginDiv text-white text-center px-10 w-[45%] flex flex-col justify-center">
  //         <h1 className="text-4xl font-mono mb-8 font-semibold">Welcome Back!</h1>
  //         <p className="text-gray-300 mb-5">
  //           To keep connected with us please login with your personal info
  //         </p>
  //         <button
  //           className=".btn border rounded-md py-2 px-5 w-[50%] mx-auto"
  //           onClick={() => path("/login")}
  //         >
  //           Login
  //         </button>
  //       </div>

  //       <form className="px-10 py-10 bg-[#26212E] w-[55%]" onSubmit={handleSignup}>
  //         <h1 className="text-3xl text-white uppercase text-center font-mono mb-10">
  //           Create Account
  //         </h1>
  //         <div className="flex items-center justify-center gap-3 text-2xl text-white mb-5">
  //           <button className="buble">
  //             <GrGoogle />
  //           </button>
  //           <button className="buble">
  //             <BsFacebook />
  //           </button>
  //           <button className="buble">
  //             <BsGithub />
  //           </button>
  //         </div>

  //         <p className="text-center text-gray-400 mb-8">or use your email for registration</p>
  //         {/* all inputs */}
  //         <div className="flex gap-3 flex-col">
  //           {/* name */}
  //           <div className="inputDiv">
  //             <FiUser />
  //             <input type="text" name="name" className="input" placeholder="Name" required />
  //           </div>
  //           {/* email */}
  //           <div className="inputDiv">
  //             <RiMailSendLine />
  //             <input type="email" name="email" className="input" placeholder="Email" required />
  //           </div>
  //           {/* role */}
  //           <div className="inputDiv">
  //             <SiSuperuser />
  //             <select name="role" className="bg-[#1C1B22] w-full outline-none" required>
  //               <option value="student">Student</option>
  //               <option value="teacher">Teacher</option>
  //             </select>
  //           </div>
  //           {/* id */}
  //           <div className="inputDiv">
  //             <MdOutlineDialpad />
  //             <input type="text" name="id" className="input" placeholder="Id" required />
  //           </div>
  //           {/* password */}
  //           <div className="inputDiv">
  //             <RiLockPasswordLine />
  //             <input
  //               type="password"
  //               name="password"
  //               className="input"
  //               placeholder="Password"
  //               required
  //             />
  //           </div>

  //           {/* submit */}
  //         </div>
  //         <div className="flex gap-5 mt-10">
  //           <button className="w-[50%] mx-auto btn text-white bg-[#3C2F67] rounded-md simpleTransition hover:w-[60%]">
  //             Sign Up
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </section>
  // );
};

export default Signup;
