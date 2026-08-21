import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { logout } from "../../service/authservice";

export default function TopHeader({ onToggleSidebar, user }) {
  const navigate = useNavigate();
  const {
    role,
    toggleRole,
    searchQuery,
    setSearchQuery,
    totalCartItems,
    wishlist,
    setIsCartOpen,
    products,
  } = useApp();

  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter products for autocomplete dropdown
  const filteredSuggestions = searchQuery.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Section: Hamburger Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition"
            title="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="bg-blue-600 px-2 py-0.5 rounded text-sm font-extrabold">CF</span>
            <span>CartForge</span>
          </Link>
        </div>

        {/* Middle Section: Integrated Search Bar with Autocomplete */}
        <div className="relative flex-1 max-w-md mx-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              placeholder="Search products by name or category..."
              className="w-full bg-slate-800 text-white text-sm placeholder-slate-400 border border-slate-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown Menu */}
          {showSearchResults && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 bg-slate-900 border-b border-slate-700">
                Search Suggestions
              </div>
              {filteredSuggestions.map((item) => (
                <div
                  key={item.id}
                  onMouseDown={() => {
                    setSearchQuery(item.title);
                    setShowSearchResults(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 cursor-pointer transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div className="flex-1 truncate">
                    <p className="text-xs font-medium text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-400">${item.price.toFixed(2)} • {item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Role Switcher, Wishlist, Cart & Profile Snippet */}
        <div className="flex items-center gap-3">
          {/* RBAC Role Switcher Toggle */}
          <button
            onClick={toggleRole}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow ${
              role === "SELLER"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            title="Switch User Role (Buyer / Seller)"
          >
            <span>{role === "SELLER" ? "🏪 Seller Mode" : "🛍️ Buyer Mode"}</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded">Switch</span>
          </button>

          {/* Wishlist Quick Access */}
          <Link
            to="/wishlist"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="Wishlist"
          >
            <span className="text-lg">❤️</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Item Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="View Cart"
          >
            <span className="text-lg">🛒</span>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* User Profile Snippet (retaining current layout style) */}
          {user && (
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="text-right text-xs">
                <p className="font-semibold text-white truncate max-w-[120px]">{user.name || user.email}</p>
                <p className="text-[10px] text-slate-400">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
