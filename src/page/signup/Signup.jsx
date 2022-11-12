// library
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
// hooks
import useGetStudentList from "../../hooks/useGetStudentList";
// styles
// icons
import { GrGoogle } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
// images
import bgAuth from "../../img/bgAuth.png";
// utilities
import { serverAddress } from "../../components/variables";
import { toastConfig } from "../../toastConfig";
// class
import Student from "../../js/student";
// components
import { bgImg } from "../../components/styles/styles";
import Logo from "../../components/shared/Logo";
import Input from "../../components/shared/Input";
import IconCover from "../../components/shared/IconCover";
import Teacher from "../../js/teacher";
import Loader from "../../components/shared/loader/Loader";
import useGetTeacherList from "../../hooks/useGetTeacherList";

const Signup = () => {
  const radious = "35px";
  const path = useNavigate();
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const { data: students } = useGetStudentList();
  const { data: teachers } = useGetTeacherList();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const name = e.target.elements.name.value.trim();
    const password = e.target.elements.password.value.trim();
    const id = e.target.elements.id.value.trim();
    const role = e.target.elements.role.value.trim();

    let user;
    let createAccount = false;
    if (role === "student") {
      [user] = students?.filter((std) => std.id === parseInt(id));
      createAccount = !user.account;
    } else if (role === "teacher") {
      console.log(teachers);
      [user] = teachers?.filter((teacher) => teacher.id === parseInt(id));
      createAccount = !user.account;
    }

    if (createAccount) {
      createUserWithEmailAndPassword(email, password).then(() => {
        updateProfile({ displayName: name });
        let accCreated = false;
        if (role === "student") {
          const newUser = new Student({ name, email, role, id });
          accCreated = newUser.createUser();
        } else if (role === "teacher") {
          const newUser = new Teacher({ name, email, role, id });
          accCreated = newUser.createUser();
        }

        // updating list so that no more account can be created with the same id
        if (accCreated) {
          const url = `${serverAddress}/acc-created/${user._id}/${role}`;
          fetch(url)
            .then((res) => res.json())
            .then((res) => console.log(res));
        }
        // singing out the user
        signOut(auth);
        path("/login");
      });
    }
    if (!createAccount) {
      toast.error("Invalid Id", toastConfig);
    }
  };

  if (error) {
    toast(error.code, toastConfig);
  }

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
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            <Input title="Email" placeholder="Your email adress" name="email" type="email" />
            <Input title="Password" placeholder="Your password" name="password" type="password" />

            <button className="btn mt-5 bg-[#542DE1] rounded-xl uppercase">
              {loading ? <Loader /> : "Sign Up"}
            </button>

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
};

export default Signup;
