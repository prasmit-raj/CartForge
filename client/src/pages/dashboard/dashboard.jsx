import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../../service/authservice";
import { useApp } from "../../context/AppContext";

import TopHeader from "../../component/layout/TopHeader";
import Sidebar from "../../component/layout/Sidebar";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";
import AccountStats from "../../component/dashboard/AccountStats";
import ProductCatalog from "../../component/dashboard/ProductCatalog";
import SellerDashboard from "../../component/dashboard/SellerDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const { role } = useApp();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setError("Failed to load user profile");
        }
      } catch (err) {
        console.error("Dashboard auth check error:", err);
        setError("Not authenticated. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-xl font-semibold animate-pulse flex items-center gap-3">
          <span className="bg-blue-600 px-3 py-1 rounded text-sm font-bold">CF</span>
          <span>Loading CartForge Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* 1. Header with integrated Search Bar, Cart badge, Role switcher */}
      <TopHeader
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        user={user}
      />

      {/* 2. Hamburger Sidebar Drawer with 5-second auto-collapse timer & 5 menu items */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 3. Quick Cart Preview Drawer */}
      <QuickCartDrawer />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {error ? (
          <div className="max-w-md mx-auto my-12 bg-amber-50 border border-amber-300 text-amber-900 p-8 rounded-xl text-center shadow-md">
            <span className="text-4xl block mb-3">🔒</span>
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-xs text-amber-700 mb-6">{error}</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow transition"
            >
              Go to Login Page
            </Link>
          </div>
        ) : (
          <>
            {/* Dashboard Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Hello, {user?.name || user?.email?.split("@")[0] || "User"} 👋
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      role === "SELLER"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {role} MODE
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Welcome to your unified CartForge control panel.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="bg-white text-slate-700 border border-slate-300 text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-slate-50 transition shadow-sm"
                >
                  🌐 Main Home Page
                </Link>
              </div>
            </div>

            {/* Account Information & Quick Stats Overview */}
            <AccountStats user={user} />

            {/* RBAC Conditional View: Seller Management Console */}
            {role === "SELLER" && <SellerDashboard />}

            {/* Product Catalog Grid with Instant Search & Category Filtering */}
            <ProductCatalog />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;