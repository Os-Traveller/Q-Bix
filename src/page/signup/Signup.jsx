import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { GrGoogle } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
import bgAuth from "../../img/bgAuth.png";
import { toastConfig } from "../../toastConfig";
import Student from "../../js/student";
import { bgImg } from "../../components/styles/styles";
import Logo from "../../components/shared/Logo";
import Input from "../../components/shared/Input";
import IconCover from "../../components/shared/IconCover";
import Loader from "../../components/shared/loader/Loader";

const Signup = () => {
  const radious = "35px";
  const path = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    //getting all necessary information to signin from user
    const id = e.target.elements.id.value.trim();
    const pin = e.target.elements.pin.value.trim();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();

    if (password.length >= 6) {
      const std = new Student({});
      const response = await std.createUser({ email, id, pin }); // creating account in database for a std

      if (!response.response) {
        // account is not created
        toast.error(response.code, toastConfig);
      } else if (response) {
        // account created
        createUserWithEmailAndPassword(email, password); // creating an user in firebase
        signOut(auth);
        path("/login"); // sending user into login page
      }
    } else {
      // when pass is less than 6 character
      e.target.elements.password.value = "";
      toast.warning("Length of password needs to be 6 or more than 6", toastConfig);
    }
  };

  if (user) {
    toast.success("Account Created Successfully", toastConfig);
  }

  if (error) {
    toast.error(error.code, toastConfig);
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
              <Input title="ID" placeholder="Your Id" name="id" type="number" />
              <Input title="Pin" placeholder="Input the pin" name="pin" type="number" />
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
