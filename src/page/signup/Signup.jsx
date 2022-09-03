import React from "react";
import { useNavigate } from "react-router-dom";
import User from "../../js/user";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Signup = () => {
  const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const path = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const name = e.target.elements.firstName.value + " " + e.target.elements.lastName.value;
    const password = e.target.elements.password.value;
    console.log(name, email);
    createUserWithEmailAndPassword(email, password).then(() => {
      updateProfile({ displayName: name }).then(console.log(user.displayName));
      path("/");
    });
    const newUser = new User(name, email);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-[#302d69]">
      <div className="max-w-[600px] mx-auto p-10 rounded-md border-gray-600 border-[1px]">
        <form onSubmit={handleSignup}>
          <h1 className="text-3xl text-white text-center font-mono mb-14">
            Create Account In Q-Bix
          </h1>
          <div className="flex gap-5 flex-col">
            {/* name */}
            <div className="flex justify-center gap-5">
              <input type="text" name="firstName" className="input" placeholder="First Name" />
              <input type="text" name="lastName" className="input" placeholder="Last Name" />
            </div>
            {/* email */}
            <input type="email" name="email" className="input" placeholder="Email" />
            {/* password */}
            <input type="password" name="password" className="input" placeholder="Password" />
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
