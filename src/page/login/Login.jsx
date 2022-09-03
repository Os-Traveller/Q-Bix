import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Login = () => {
  const path = useNavigate();
  const [signInWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    signInWithEmailAndPassword(email, password).then(() => {
      path("/");
    });
  };
  return (
    <section className="flex justify-center items-center h-screen bg-[#302d69]">
      <div className="max-w-[600px] mx-auto p-10 rounded-md border-gray-600 border-[1px]">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl text-white text-center font-mono mb-20">
            Please Login Into Q-Bix
          </h1>
          <div className="flex gap-5 flex-col">
            {/* email */}
            <input type="email" name="email" className="input" placeholder="Email" />
            {/* password */}
            <input type="password" name="password" className="input" placeholder="Password" />
            {/* submit */}
            <div className="flex gap-5">
              <button className="btn text-white bg-[#454081] rounded">Change Method</button>
              <button className="btn text-white bg-[#F47458] rounded">Login</button>
            </div>
          </div>

          <p className="mt-8 text-gray-400 text-center">
            Don't have any account?{" "}
            <span
              className="text-[#F47458] underline cursor-pointer"
              onClick={() => path("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
