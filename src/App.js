import { Route, Routes } from "react-router-dom";
import Cources from "./page/home/cources/Cources";
import Dashboard from "./page/home/dashboard/Dashboard";
import AuthProvider from "./authProvider/AuthProvider";
import Home from "./page/home/Home";
import Result from "./page/home/result/Result";
import Routine from "./page/home/routine/Routine";
import Waiver from "./page/home/waiver/Waiver";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Home />
          </AuthProvider>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cources" element={<Cources />} />
        <Route path="routine" element={<Routine />} />
        <Route path="result" element={<Result />} />
        <Route path="waiver" element={<Waiver />} />
        <Route path="waiver" element={<Waiver />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={"No Page Found"} />
    </Routes>
  );
}

export default App;
