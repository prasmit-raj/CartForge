import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Privacy from "../pages/footer/privacy";
import Terms from "../pages/footer/terms";
import Contact from "../pages/footer/contact";

import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";

import ForgetPassword from "../pages/forgetpassword/forgetpassword";
import Enterotp from "../pages/forgetpassword/enterotp";
import ResetPassword from "../pages/forgetpassword/resetpassword";
import Loginotp from "../pages/login/loginotp";
import Signupotp from "../pages/signup/signupotp";

import Dashboard from "../pages/dashboard/dashboard";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />
      <Route path="/loginotp" element={<Loginotp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupotp" element={<Signupotp />} />

      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/enterotp" element={<Enterotp />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoute;