import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GrGoogle } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { RiMailSendLine, RiLockPasswordLine } from "react-icons/ri";
import auth from "../../firebase.init";

const Login = () => {
  const path = useNavigate();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    signInWithEmailAndPassword(email, password).then(() => {
      path("/");
    });
    path("/");
  };

  return (
    <section className="flex justify-center items-center h-screen linerBg">
      <div
        className="w-[800px] mx-auto rounded-xl overflow-hidden border-gray-600 border-[1px] shadow-md 
      shadow-[#171520] flex"
      >
        <div className="lingerBgSingupLoginDiv text-white text-center px-10 w-[45%] flex flex-col justify-center">
          <h1 className="text-4xl mb-8">Welcome Here!</h1>
          <p className="text-gray-300 mb-5">
            If you are new here, plase signup by clicking the button down below
          </p>
          <button
            className=".btn border rounded-md py-2 px-5 w-[50%] mx-auto"
            onClick={() => path("/signup")}
          >
            Signup
          </button>
        </div>
        <form className="px-10 py-10 bg-[#26212E] w-[55%]" onSubmit={handleLogin}>
          <h1 className="text-3xl uppercase text-white text-center font-mono mb-10">
            Login into your account
          </h1>
          <div className="flex items-center justify-center gap-3 text-2xl text-white mb-5">
            <button className="buble">
              <GrGoogle />
            </button>
            <button className="buble">
              <BsFacebook />
            </button>
            <button className="buble">
              <BsGithub />
            </button>
          </div>
          <p className="text-center text-gray-400 mb-8">or use your email to login</p>
          {/* all inputs */}
          <div className="flex gap-3 flex-col">
            {/* email */}
            <div className="inputDiv">
              <RiMailSendLine />
              <input type="email" name="email" className="input" placeholder="Email" required />
            </div>

            <div className="inputDiv">
              <RiLockPasswordLine />
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="flex gap-5 mt-10">
            {/* submit */}
            <button className="w-[50%] mx-auto btn text-white bg-[#3C2F67] rounded-md simpleTransition hover:w-[60%]">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
