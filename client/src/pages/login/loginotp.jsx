import background from "../../assets/ocean.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { verifyloginotp, loginotp } from "../../service/authservice";

function Loginotp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!email || !otp) {
      setError("Please enter both email and OTP");
      return;
    }

    try {
      setLoading(true);
      const result = await verifyloginotp({ email, otp });
      console.log("Login OTP verified:", result);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setInfoMessage("");

    if (!email) {
      setError("Email address is required to resend OTP");
      return;
    }

    try {
      setLoading(true);
      const result = await loginotp({ email });
      setInfoMessage(result.message || "A new login OTP has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
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
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Verify Login OTP</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {infoMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {infoMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-800 mb-1">
            Enter 6-digit OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            maxLength={6}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 px-4 rounded transition duration-200 mb-4"
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>

        <div className="flex justify-between items-center text-sm text-gray-800">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={loading}
            className="text-blue-700 font-semibold hover:underline bg-transparent border-0 cursor-pointer"
          >
            Resend OTP
          </button>
          <Link to="/login" className="text-gray-700 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Loginotp;