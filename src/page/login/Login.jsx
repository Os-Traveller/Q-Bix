import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import { bgImg } from "../../components/styles/styles";
import { GrGoogle } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
import auth from "../../firebase.init";
import bgAuth from "../../img/bgAuth.png";
import Logo from "../../components/shared/Logo";
import IconCover from "../../components/shared/IconCover";
import Input from "../../components/shared/Input";
import { toast } from "react-toastify";
import { toastConfig } from "../../toastConfig";
import Loader from "../../components/shared/loader/Loader";
import { useState } from "react";
import Modal from "../../components/shared/Modal";
import { colorGreen } from "../../components/styles/colors";

const Login = () => {
  const path = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [openModal, setOpenModal] = useState(false);
  const radious = "35px";

  if (user) {
    path("/");
  }

  if (error) {
    toast.error(error.code, { ...toastConfig });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;
    signInWithEmailAndPassword(email, password);
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    const email = e.target.elements.email.value.trim();
    await sendPasswordResetEmail(email);
    toast.success("Password reset email has been sent to your email", toastConfig);
    setOpenModal(false);
  };

  return (
    <section className="bg-[#0B0F33] h-screen flex">
      <div className="w-[60%] centerXY lg:flex hidden" style={{ ...bgImg(bgAuth) }}>
        <Logo font={"50px"} />
      </div>
      <div className="md:p-32 p-10 lg:w-1/2 w-full flex justify-center md:justify-start items-center text-white">
        <form className="w-fit" onSubmit={handleLogin}>
          <h2 className="text-3xl font-semibold">Nice to see you!</h2>
          <p className="text-gray-400 mt-2">Enter Your Email and Password to Sign In</p>
          <div className="flex gap-5 mt-5">
            <IconCover icon={<GrGoogle />} radious={radious} />
            <IconCover icon={<BsFacebook />} radious={radious} />
            <IconCover icon={<BsGithub />} radious={radious} />
          </div>
          <div className="mt-8 flex flex-col gap-5">
            <Input title="Email" placeholder="Your email adress" name="email" type="email" />
            <Input title="Password" placeholder="Your password" name="password" type="password" />
            <p
              className="text-white font-semibold underline cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Forgot password?
            </p>

            <button className="btn bg-[#542DE1] rounded-xl uppercase">
              {loading ? <Loader /> : "Login"}
            </button>

            <p className="text-gray-400 font-semibold text-center">
              Don't have any Account?{" "}
              <span
                className="text-white font-semibold cursor-pointer"
                onClick={() => path("/signup")}
              >
                Sing Up
              </span>
            </p>
          </div>
        </form>
        {/* forget password */}
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          width={"500px"}
          title="Reset Your Password"
        >
          <form onSubmit={handleForgetPassword} className="text-white px-5">
            <Input title="Email" placeholder="Your email adress" name="email" type="email" />
            {sending && (
              <p
                className="btn w-fit mx-auto block mt-5 rounded-md"
                style={{ backgroundColor: colorGreen }}
              >
                <Loader />
              </p>
            )}

            {!sending && (
              <button
                className="btn w-fit mx-auto block mt-5 rounded-md"
                style={{ backgroundColor: colorGreen }}
              >
                Submit
              </button>
            )}
          </form>
        </Modal>
      </div>
    </section>
  );
};

export default Login;
