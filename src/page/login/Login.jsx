import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const path = useNavigate();
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-[#302d69] max-w-[600px] mx-auto p-10 rounded-md shadow">
        <form action="">
          <h1 className="text-3xl text-white text-center font-mono mb-14">
            Please Login Into Q-Bix
          </h1>
          <div className="flex gap-5 flex-col">
            {/* email */}
            <input type="email" className="input" placeholder="Email" />
            {/* password */}
            <input type="password" className="input" placeholder="Password" />
            {/* submit */}
            <div className="flex gap-5">
              <button className="btn text-white bg-[#454081] rounded">Change Method</button>
              <button className="btn text-white bg-[#F47458] rounded">Login</button>
            </div>
          </div>

          <p className="mt-8 text-gray-400 text-center">
            Don't have any account?{" "}
            <span className="text-[#F47458] underline cursor-pointer" onClick={() => path("/")}>
              Signup
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
