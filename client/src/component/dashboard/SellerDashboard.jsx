import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function SellerDashboard() {
  const { products, addProduct, deleteProduct } = useApp();

  const [activeSubTab, setActiveSubTab] = useState("inventory"); // 'inventory' | 'add' | 'analytics'
  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    price: "",
    image: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    addProduct({
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60",
    });

    setFormData({ title: "", category: "Electronics", price: "", image: "" });
    setSuccessMsg("New product added to catalog successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
    setActiveSubTab("inventory");
  };

  return (
    <div className="bg-purple-900/5 border border-purple-200 rounded-xl p-6 mb-8">
      {/* Seller Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-purple-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              SELLER CONSOLE
            </span>
            <h2 className="text-xl font-bold text-slate-900">Merchant Management</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your store listings, publish products, and view store analytics.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab("inventory")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === "inventory"
                ? "bg-purple-600 text-white shadow"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-purple-50"
            }`}
          >
            🏷️ My Products ({products.length})
          </button>
          <button
            onClick={() => setActiveSubTab("add")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === "add"
                ? "bg-purple-600 text-white shadow"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-purple-50"
            }`}
          >
            ➕ Add Product
          </button>
          <button
            onClick={() => setActiveSubTab("analytics")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === "analytics"
                ? "bg-purple-600 text-white shadow"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-purple-50"
            }`}
          >
            📈 Sales Analytics
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-lg text-xs font-semibold mb-4">
          {successMsg}
        </div>
      )}

      {/* 1. Inventory List Tab */}
      {activeSubTab === "inventory" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Rating</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="font-semibold text-slate-800">{p.title}</span>
                  </td>
                  <td className="p-3 text-slate-600">{p.category}</td>
                  <td className="p-3 font-bold text-slate-900">${p.price.toFixed(2)}</td>
                  <td className="p-3 text-amber-600 font-semibold">★ {p.rating}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2.5 py-1 rounded border border-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. Add Product Tab */}
      {activeSubTab === "add" && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <h3 className="text-base font-bold text-slate-800 mb-2">Publish New Merchant Product</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Ergonomic Standing Desk"
              className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Wearables">Wearables</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="99.99"
                className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded shadow transition"
          >
            Publish Product Listing
          </button>
        </form>
      )}

      {/* 3. Sales Analytics Tab */}
      {activeSubTab === "analytics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">Total Store Revenue</p>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">$4,890.50</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">Orders Fulfilled</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">142</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">Active Products</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">{products.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">Conversion Rate</p>
            <p className="text-2xl font-extrabold text-green-600 mt-1">3.4%</p>
          </div>
        </div>
      )}
    </div>
  );
}
