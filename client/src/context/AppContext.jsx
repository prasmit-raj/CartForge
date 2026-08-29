import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../service/authservice";

const AppContext = createContext();

export const initialProducts = [
  {
    id: "prod-1",
    title: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 199.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "TechForge Ltd",
  },
  {
    id: "prod-2",
    title: "Smart Fitness Watch Ultra",
    category: "Wearables",
    price: 149.50,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "GearNation",
  },
  {
    id: "prod-3",
    title: "Minimalist Leather Backpack",
    category: "Fashion",
    price: 89.00,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "CraftedGoods",
  },
  {
    id: "prod-4",
    title: "Mechanical RGB Gaming Keyboard",
    category: "Electronics",
    price: 119.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "TechForge Ltd",
  },
  {
    id: "prod-5",
    title: "Ergonomic Aluminium Laptop Stand",
    category: "Accessories",
    price: 45.00,
    rating: 4.5,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "OfficeSpace Co.",
  },
  {
    id: "prod-6",
    title: "Stainless Steel Thermal Water Bottle",
    category: "Lifestyle",
    price: 28.99,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
    inStock: true,
    seller: "EcoLife",
  },
];

export const AppProvider = ({ children }) => {
  // Current user state
  const [user, setUser] = useState(null);

  // Role-Based Authorization: 'BUYER' or 'SELLER'
  const [role, setRole] = useState("BUYER");

  // Loading state for initial session fetch
  const [loading, setLoading] = useState(true);

  // Search Query state for instant header filtering
  const [searchQuery, setSearchQuery] = useState("");

  // Product Catalog state (allows sellers to add new items)
  const [products, setProducts] = useState(initialProducts);

  // Cart state: Array of { product, quantity }
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cartforge_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state: Array of product IDs
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("cartforge_wishlist");
    return saved ? JSON.parse(saved) : ["prod-1", "prod-3"];
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your order #CF-9821 has been shipped!", time: "2 hours ago", read: false },
    { id: 2, text: "Price drop on Wireless Headphones!", time: "1 day ago", read: true },
  ]);

  // Quick Cart drawer visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch current user session and sync user role
  useEffect(() => {
    const fetchUser = async () => {
      const existingToken = localStorage.getItem("token") || localStorage.getItem("cartforge_token");

      try {
        const response = await getMe();
        if (response.success && response.data) {
          const fetchedUser = response.data;
          setUser(fetchedUser);
          const computedRole =
            fetchedUser.role ||
            (fetchedUser.email?.toLowerCase() === "prasmitraj056@gmail.com" ? "SELLER" : "BUYER");
          setRole(computedRole);
        }
      } catch (err) {
        // Unauthenticated visitor or expired token
        setUser(null);
        if (!existingToken) {
          // Clean storage if no token existed
          localStorage.removeItem("token");
          localStorage.removeItem("cartforge_token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Persist cart & wishlist in LocalStorage
  useEffect(() => {
    localStorage.setItem("cartforge_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartforge_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Role Toggle helper for testing/admin mode
  const toggleRole = () => {
    setRole((prev) => (prev === "BUYER" ? "SELLER" : "BUYER"));
  };

  // Cart actions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Product management for Sellers
  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviews: 0,
      inStock: true,
      seller: "Your Store",
    };
    setProducts((prev) => [created, ...prev]);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Calculated totals
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        role,
        setRole,
        toggleRole,
        searchQuery,
        setSearchQuery,
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        totalCartItems,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        notifications,
        isCartOpen,
        setIsCartOpen,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
