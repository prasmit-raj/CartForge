import background from "../../assets/ocean.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../service/authservice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const result = await login({ email, password });
      console.log("Login success:", result);
      navigate("/loginotp", { state: { email } });
    } catch (err) {
      setError(err.message || "Login failed");
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
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">User Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end text-sm mb-6">
          <Link to="/forgetpassword" className="text-blue-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 px-4 rounded transition duration-200 mb-4"
        >
          {loading ? "Sending OTP..." : "Login"}
        </button>

        <div className="text-center text-sm text-gray-800">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;