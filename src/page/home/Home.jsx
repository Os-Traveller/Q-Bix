import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <section className="text-center mt-10">
      <h1 className="text-2xl text-white mb-3">Welcome!!</h1>
      <p className="text-3xl text-white mb-5">{user.displayName}</p>
      <button className="btn text-white w-fit bg-[#F47458] rounded" onClick={() => signOut(auth)}>
        Logout
      </button>
    </section>
  );
};

export default Home;
