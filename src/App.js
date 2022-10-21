import { Route, Routes } from "react-router-dom";
import Cources from "./page/home/cources/Cources";
import Dashboard from "./page/home/dashboard/Dashboard";
import AuthProvider from "./authProvider/AuthProvider";
import Home from "./page/home/Home";
import Result from "./page/home/result/Result";
import Routine from "./page/home/routine/Routine";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";
import ResultSemester from "./page/home/result/ResultSemester";
import ResultAll from "./page/home/result/ResultAll";
import Fees from "./page/home/waiver/Fees";
import OnlinePayment from "./page/home/waiver/OnlinePayment";

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
        <Route path="online-payment" element={<OnlinePayment />} />
        <Route path="result" element={<Result />}>
          <Route index element={<ResultAll />} />
          <Route path="semester" element={<ResultSemester />} />
          <Route path="upcoming" element={"Upcoming"} />
          <Route path="retake" element={"Retake"} />
        </Route>
        <Route path="fees" element={<Fees />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={"No Page Found"} />
    </Routes>
  );
}

export default App;
