import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine active sub-tab from route or fallback to 'profile'
  const currentTab = location.pathname.split("/")[2] || "profile";

  const [formData, setFormData] = useState({
    name: "CartForge Member",
    email: "user@cartforge.com",
    phone: "+1 (555) 234-5678",
    twoFactor: true,
    dataSharing: false,
    visibility: "Public",
    currentPassword: "",
    newPassword: "",
  });

  const [savedMsg, setSavedMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg("Settings updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
            <p className="text-xs text-slate-500">Manage your profile, security, and preferences</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {savedMsg && (
          <div className="bg-green-100 border border-green-400 text-green-800 text-xs font-bold px-4 py-3 rounded-lg mb-6">
            {savedMsg}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Sub-tab Navigation Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-1">
            <Link
              to="/settings/profile"
              className={`block px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                currentTab === "profile"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              👤 Profile Information
            </Link>
            <Link
              to="/settings/security"
              className={`block px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                currentTab === "security"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              🔒 Security & 2FA
            </Link>
            <Link
              to="/settings/privacy"
              className={`block px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                currentTab === "privacy"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              🛡️ Privacy & Sharing
            </Link>
            <Link
              to="/settings/password"
              className={`block px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                currentTab === "password"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              🔑 Change Password
            </Link>
          </div>

          {/* Sub-tab Content Area */}
          <form onSubmit={handleSave} className="flex-1 p-6 space-y-6">
            {/* 1. Profile */}
            {currentTab === "profile" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Personal Details
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* 2. Security */}
            {currentTab === "security" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Two-Factor Authentication & Devices
                </h3>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Two-Factor Authentication (OTP/2FA)</p>
                    <p className="text-[11px] text-slate-500">Require an OTP code on login attempts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.twoFactor}
                    onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-xs font-bold text-slate-800 mb-2">Active Session Devices</p>
                  <p className="text-xs text-slate-600">💻 Windows Desktop • Chrome (Current Session)</p>
                </div>
              </div>
            )}

            {/* 3. Privacy */}
            {currentTab === "privacy" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Data Sharing & Account Visibility
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Visibility</label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Public">Public (Sellers & Community)</option>
                    <option value="Private">Private Only</option>
                  </select>
                </div>
              </div>
            )}

            {/* 4. Password */}
            {currentTab === "password" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Update Account Password
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition"
            >
              Save Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
