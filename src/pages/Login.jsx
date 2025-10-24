import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Toast from "../components/Toast.jsx";
import { loginUser } from "../utils/authentication.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      loginUser(email, password);
      setToast({ show: true, message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setToast({ show: true, message: err.message, type: "error" });
    }
  };

  return (
    <section className="relative bg-background min-h-screen flex flex-col justify-center items-center overflow-hidden p-4">
      <Toast message={toast.message} type={toast.type} show={toast.show} />

      <motion.div
        className="relative z-10 bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
