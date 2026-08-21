import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mockOrders = [
    {
      id: "CF-9821",
      date: "August 18, 2026",
      status: "Shipped",
      total: 199.99,
      items: ["Wireless Noise-Canceling Headphones"],
    },
    {
      id: "CF-9540",
      date: "August 02, 2026",
      status: "Delivered",
      total: 134.00,
      items: ["Minimalist Leather Backpack", "Aluminium Stand"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Order History</h1>
            <p className="text-xs text-slate-500">Track and manage your past purchases</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-slate-900">{order.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Placed on {order.date}</p>
                <p className="text-xs text-slate-700 font-medium mt-2">
                  Items: {order.items.join(", ")}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-extrabold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>
                <button className="mt-2 text-xs text-blue-600 font-semibold hover:underline">
                  View Order Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
