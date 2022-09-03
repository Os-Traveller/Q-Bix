import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const path = useNavigate();
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-[#302d69] max-w-[600px] mx-auto p-10 rounded-md shadow">
        <form action="">
          <h1 className="text-3xl text-white text-center font-mono mb-14">
            Create Account In Q-Bix
          </h1>
          <div className="flex gap-5 flex-col">
            {/* name */}
            <div className="flex justify-center gap-5">
              <input type="text" className="input" placeholder="First Name" />
              <input type="text" className="input" placeholder="Last Name" />
            </div>
            {/* email */}
            <input type="email" className="input" placeholder="Email" />
            {/* password */}
            <input type="password" className="input" placeholder="Password" />
            {/* submit */}
            <div className="flex gap-5">
              <button className="btn text-white bg-[#454081] rounded">Change Method</button>
              <button className="btn text-white bg-[#F47458] rounded">Sign Up</button>
            </div>
          </div>

          <p className="mt-8 text-gray-400 text-center">
            Already have an account?{" "}
            <span
              className="text-[#F47458] underline cursor-pointer"
              onClick={() => path("/login")}
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
