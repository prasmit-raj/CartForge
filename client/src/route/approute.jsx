import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Privacy from "../pages/footer/privacy";
import Terms from "../pages/footer/terms";
import Contact from "../pages/footer/contact";

import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";

import ForgetPassword from "../pages/forgetpassword/forgetpassword";

import Dashboard from "../pages/dashboard/dashboard";
import OrdersPage from "../pages/orders/orders";
import WishlistPage from "../pages/wishlist/wishlist";
import FullCartPage from "../pages/cart/cart";
import SettingsPage from "../pages/settings/settings";
import SellerInventoryPage from "../pages/seller/inventory";
import SellerAnalyticsPage from "../pages/seller/analytics";

import SellerRoute from "../component/route/SellerRoute";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />

      {/* Instant Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />

      {/* Main User Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<FullCartPage />} />

      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/*" element={<SettingsPage />} />

      {/* Protected Seller Routes (RBAC Guard) */}
      <Route
        path="/seller/inventory"
        element={
          <SellerRoute>
            <SellerInventoryPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/analytics"
        element={
          <SellerRoute>
            <SellerAnalyticsPage />
          </SellerRoute>
        }
      />
    </Routes>
  );
}

export default AppRoute;