import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMe, logout } from "../../service/authservice";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setError("Failed to load user profile");
        }
      } catch (err) {
        console.error("Dashboard auth check error:", err);
        setError("Not authenticated. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading your Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">User Dashboard</h1>
            <p className="text-slate-500">Welcome back to CartForge!</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded hover:bg-slate-300 transition"
            >
              Home Page
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg text-center">
            <p className="text-lg font-semibold mb-3">{error}</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Go to Login Page
            </Link>
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Account Information</h2>
              <div className="space-y-3 text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">Name: </span>
                  {user.name || "N/A"}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Email: </span>
                  {user.email}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Verification Status: </span>
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                    Verified Account
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Member Since: </span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Stats</h2>
              <div className="space-y-3 text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">User ID: </span>
                  <code className="text-xs bg-slate-200 px-2 py-1 rounded">{user.id}</code>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Session Status: </span>
                  <span className="text-green-600 font-semibold">Active HTTP-Only Session</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;