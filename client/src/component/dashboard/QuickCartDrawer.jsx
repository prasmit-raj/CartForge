import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function QuickCartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    clearCart,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h3 className="font-bold text-lg">Your Cart</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-slate-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="font-semibold text-slate-600">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Explore our catalog and add items!</p>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {product.title}
                  </h4>
                  <p className="text-xs font-extrabold text-blue-600 mt-0.5">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(product.id, -1)}
                      className="w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded text-xs font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(product.id, 1)}
                      className="w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded text-xs font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 hover:text-red-700 text-sm p-1"
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-slate-800">
              <span>Subtotal:</span>
              <span className="text-lg text-blue-600">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={clearCart}
                className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded transition"
              >
                Clear Cart
              </button>
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
