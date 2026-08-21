import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function ProductCatalog() {
  const {
    products,
    searchQuery,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  const categories = ["All", "Electronics", "Wearables", "Fashion", "Accessories", "Lifestyle"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      {/* Catalog Header & Category Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Featured Catalog</h2>
          <p className="text-sm text-slate-500">
            Browse our top products with unmissable prices
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl z-50 animate-bounce flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Card Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-400 text-lg mb-2">🔍 No products found</p>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isWished = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image & Wishlist Heart */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                    {product.category}
                  </span>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => {
                      toggleWishlist(product.id);
                      showToast(
                        isWished
                          ? `Removed ${product.title} from Wishlist`
                          : `Added ${product.title} to Wishlist`
                      );
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                      isWished
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-slate-600 hover:bg-white"
                    }`}
                    title={isWished ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    ❤️
                  </button>
                </div>

                {/* Product Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-blue-600 transition line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="text-amber-500 font-bold">★ {product.rating}</span>
                      <span>({product.reviews} reviews)</span>
                      <span>•</span>
                      <span className="text-slate-400">{product.seller}</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                    <div>
                      <span className="text-xs text-slate-400 block">Price</span>
                      <span className="text-xl font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Added ${product.title} to Cart`);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5"
                    >
                      <span>🛒</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
