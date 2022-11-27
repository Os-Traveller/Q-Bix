import { Route, Routes } from "react-router-dom";
import AuthProvider from "./authProvider/AuthProvider.jsx";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";
import Result from "./page/home/student/result/Result";
import ResultSemester from "./page/home/student/result/ResultSemester";
import ResultAll from "./page/home/student/result/ResultAll";
import Courses from "./page/home/student/courses/Courses";
import OnlinePayment from "./page/home/student/waiver/OnlinePayment";
import Registration from "./page/home/student/courses/Registration";
import Fees from "./page/home/student/waiver/Fees";
import DashBoard from "./page/home/Dashboard.jsx";
import UpdateResult from "./page/home/admin/updateResult/UpdateResult";
import SearchResult from "./page/home/admin/search/SearchResult";
import SearchStdInfo from "./page/home/admin/search/studentInfo/SearchStdInfo";

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
        <Route index element={<DashBoard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="search-result/:keyWord" element={<SearchResult />} />
        <Route path="student/:email" element={<SearchStdInfo />} />
        <Route path="online-payment" element={<OnlinePayment />} />
        <Route path="registration" element={<Registration />} />
        <Route path="update-result" element={<UpdateResult />} />
        <Route path="result" element={<Result />}>
          <Route index element={<ResultSemester />} />
          <Route index path="all" element={<ResultAll />} />
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
