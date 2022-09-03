import { Route, Routes } from "react-router-dom";
import AuthProvider from "./authProvider/AuthProvider";
import Home from "./page/home/Home";
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
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
