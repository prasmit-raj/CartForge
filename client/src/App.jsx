import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ForgetPassword from "./pages/forgetpassword/forgetpassword";
import Enterotp from "./pages/forgetpassword/enterotp";
import ResetPassword from "./pages/forgetpassword/resetpassword";
import Loginotp from "./pages/login/loginotp";
import Signupotp from "./pages/signup/signupotp";

import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginotp" element={<Loginotp />} />
        <Route path="/signupotp" element={<Signupotp />} />

        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/enterotp" element={<Enterotp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;