import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Sidebar from "../../component/layout/Sidebar";
import TopHeader from "../../component/layout/TopHeader";
import QuickCartDrawer from "../../component/dashboard/QuickCartDrawer";

export default function FullCartPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    clearCart,
  } = useApp();

  const shippingCost = cartSubtotal > 0 ? 9.99 : 0;
  const totalAmount = cartSubtotal + shippingCost;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <TopHeader onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <QuickCartDrawer />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
            <p className="text-xs text-slate-500">Review your selected items and checkout</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-slate-200 shadow-sm">
            <span className="text-5xl block mb-3">🛒</span>
            <p className="font-bold text-slate-700 text-lg">Your Cart is Currently Empty</p>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Product Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-2">{product.category}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(product.id, -1)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, 1)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-red-500 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-extrabold text-slate-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-400">${product.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-bold text-slate-800">${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl text-blue-600">${totalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  alert("Order placed successfully!");
                  clearCart();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
