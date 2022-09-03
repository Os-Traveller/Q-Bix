import { Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
