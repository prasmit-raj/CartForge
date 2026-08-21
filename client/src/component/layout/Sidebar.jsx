import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { role, wishlist, totalCartItems, setIsCartOpen } = useApp();
  const location = useLocation();

  // Nested dropdown state for Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    location.pathname.startsWith("/settings")
  );

  // Auto-collapse 5-second countdown logic
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Clear any running timers when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdown(null);
    }
  }, [isOpen]);

  // Handle Mouse Leave: Start 5-second countdown
  const handleMouseLeave = () => {
    if (!isOpen) return;

    // Reset any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCountdown(5);

    // Update countdown display every second
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);

    // Close sidebar after 5 seconds
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdown(null);
    }, 5000);
  };

  // Handle Mouse Enter: Cancel countdown and reset
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCountdown(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Side Drawer Component */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-slate-100 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg text-lg">
              CF
            </span>
            <span className="font-bold text-xl text-white">CartForge</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white text-2xl p-1 transition"
            title="Close menu"
          >
            &times;
          </button>
        </div>

        {/* 5-Second Auto-Close Visual Indicator Alert */}
        {countdown !== null && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300 font-medium">
            <span>Auto-closing in {countdown}s...</span>
            <span className="text-[10px] text-amber-400 font-normal">Hover to stay</span>
          </div>
        )}

        {/* Navigation Items (5 Primary Items) */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {/* 1. Dashboard */}
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive("/dashboard")
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">📊</span>
            <span>Dashboard</span>
          </Link>

          {/* 2. Order History */}
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive("/orders")
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">📦</span>
            <span>Order History</span>
          </Link>

          {/* 3. Wishlist */}
          <Link
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive("/wishlist")
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">❤️</span>
              <span>Wishlist</span>
            </div>
            {wishlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 4. Cart / Notifications */}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🛒</span>
              <span>Cart Preview</span>
            </div>
            {totalCartItems > 0 && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* 5. Settings (Collapsible Dropdown) */}
          <div>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">⚙️</span>
                <span>Settings</span>
              </div>
              <span className={`transform transition-transform ${isSettingsOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {/* Nested Sub-Items */}
            {isSettingsOpen && (
              <div className="ml-8 mt-1 space-y-1 border-l-2 border-slate-700 pl-3">
                <Link
                  to="/settings/profile"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded text-xs transition ${
                    isActive("/settings/profile")
                      ? "text-blue-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  👤 Profile
                </Link>
                <Link
                  to="/settings/security"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded text-xs transition ${
                    isActive("/settings/security")
                      ? "text-blue-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🔒 Security & 2FA
                </Link>
                <Link
                  to="/settings/privacy"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded text-xs transition ${
                    isActive("/settings/privacy")
                      ? "text-blue-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🛡️ Privacy & Sharing
                </Link>
                <Link
                  to="/settings/password"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded text-xs transition ${
                    isActive("/settings/password")
                      ? "text-blue-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🔑 Change Password
                </Link>
              </div>
            )}
          </div>

          {/* Seller Section (RBAC conditional tab) */}
          {role === "SELLER" && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Seller Console
              </div>
              <Link
                to="/seller/inventory"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive("/seller/inventory")
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-purple-300 hover:bg-purple-900/40 hover:text-white"
                }`}
              >
                <span>🏷️</span>
                <span>My Products</span>
              </Link>
              <Link
                to="/seller/analytics"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive("/seller/analytics")
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-purple-300 hover:bg-purple-900/40 hover:text-white"
                }`}
              >
                <span>📈</span>
                <span>Sales Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Mode: <span className="font-semibold text-slate-300">{role}</span>
        </div>
      </aside>
    </>
  );
}
