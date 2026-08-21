import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";
import SellerDashboard from "../../component/dashboard/SellerDashboard";

export default function SellerInventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Merchant Inventory</h1>
            <p className="text-xs text-slate-500">Add, edit, or delete store items in real-time</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <SellerDashboard />
      </main>
    </div>
  );
}
