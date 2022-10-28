import { Route, Routes } from "react-router-dom";
import AuthProvider from "./authProvider/AuthProvider";
// components
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";
import StdDashboard from "./page/home/student/dashboard/StdDashboard";
import Result from "./page/home/student/result/Result";
import Routine from "./page/home/student/routine/Routine";
import ResultSemester from "./page/home/student/result/ResultSemester";
import ResultAll from "./page/home/student/result/ResultAll";
import Courses from "./page/home/student/courses/Courses";
import OnlinePayment from "./page/home/student/waiver/OnlinePayment";
import Registration from "./page/home/student/courses/Registration";
import Fees from "./page/home/student/waiver/Fees";

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
        <Route index element={<StdDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="routine" element={<Routine />} />
        <Route path="online-payment" element={<OnlinePayment />} />
        <Route path="registration" element={<Registration />} />
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
