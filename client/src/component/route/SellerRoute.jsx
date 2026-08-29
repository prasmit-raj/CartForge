import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

/**
 * Protected Route Wrapper for Seller-Only pages (/seller/*).
 * Redirects Buyers to home ('/') with 403 Forbidden access control behavior.
 */
export default function SellerRoute({ children }) {
  const { role, user, loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const effectiveRole = user?.role || role;
  const isSeller =
    effectiveRole === "SELLER" ||
    user?.email?.toLowerCase() === "prasmitraj056@gmail.com";

  if (!isSeller) {
    console.warn("[RBAC GUARD] Access denied: User is not authorized to view Seller console.");
    return <Navigate to="/" replace />;
  }

  return children;
}
