import background from "../../assets/ocean.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { resetpassword } from "../../service/authservice";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [resetToken, setResetToken] = useState(location.state?.resetToken || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resetToken) {
      setError("Reset token is missing. Please verify your OTP first.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const result = await resetpassword({ resetToken, newPassword });
      console.log("Password reset success:", result);
      alert("Password reset successfully! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />

      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-xl w-[420px]"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Reset Password</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {!location.state?.resetToken && (
          <div className="mb-4">
            <label htmlFor="resetToken" className="block text-sm font-medium text-gray-800 mb-1">
              Reset Token:
            </label>
            <input
              type="text"
              id="resetToken"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="Paste reset token if not auto-filled"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-800 mb-1">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 px-4 rounded transition duration-200 mb-4"
        >
          {loading ? "Resetting Password..." : "Submit New Password"}
        </button>

        <div className="text-center text-sm text-gray-800">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;