import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";

export default function WishlistPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { wishlist, products, toggleWishlist, addToCart } = useApp();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
            <p className="text-xs text-slate-500">Saved items you want to buy later</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-slate-200 shadow-sm">
            <span className="text-4xl block mb-2">❤️</span>
            <p className="font-bold text-slate-700">Your wishlist is empty</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Explore the catalog and save items to your wishlist!
            </p>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    {product.title}
                  </h3>
                  <p className="text-xs font-extrabold text-blue-600 mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded transition"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold px-3 py-2 rounded border border-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
