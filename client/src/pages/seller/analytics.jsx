import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";

export default function SellerAnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Sales Analytics</h1>
            <p className="text-xs text-slate-500">Track merchant metrics, earnings, and order velocity</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase">Gross Revenue</p>
            <p className="text-3xl font-extrabold text-purple-600 mt-2">$12,450.80</p>
            <p className="text-[10px] text-green-600 font-bold mt-1">↑ +14.2% this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase">Total Orders</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">348</p>
            <p className="text-[10px] text-blue-600 font-bold mt-1">98% fulfillment rate</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase">Avg Order Value</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-2">$35.78</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Across 5 categories</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase">Customer Rating</p>
            <p className="text-3xl font-extrabold text-amber-500 mt-2">4.85 ★</p>
            <p className="text-[10px] text-amber-600 font-bold mt-1">Based on 289 reviews</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Monthly Revenue Growth</h3>
          <div className="h-48 bg-slate-50 border border-slate-100 rounded-lg flex items-end justify-between p-4 gap-2">
            {[45, 60, 52, 78, 85, 95, 110, 125, 140, 160].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  style={{ height: `${val}px` }}
                  className="w-full bg-purple-600 rounded-t hover:bg-purple-500 transition cursor-pointer"
                  title={`Month ${idx + 1}: $${val * 100}`}
                />
                <span className="text-[10px] text-slate-400 font-bold">M{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
