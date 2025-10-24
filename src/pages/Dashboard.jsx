import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser, isAuthenticated } from "../utils/authentication.js";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const navigate = useNavigate();

  // redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const lastUser = users[users.length - 1];
    setUser(lastUser);
  }, [navigate]);

  // function to recalculate ticket stats
  const calculateStats = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in-progress").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;

    setStats({ total, open, inProgress, resolved });
  };

  // load initial stats
  useEffect(() => {
    calculateStats();
  }, []);

  // sync stats in real-time when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => calculateStats();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // also poll for updates while on the dashboard
  useEffect(() => {
    const interval = setInterval(calculateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <section className="relative bg-background min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* Wave Background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="fixed top-0 left-0 w-full h-auto z-0"
      >
        <path
          fill="#2563EB"
          fillOpacity="0.5"
          d="M0,96L80,90.7C160,85,320,75,480,101.3C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>

      {/* Decorative Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 bg-blue-400/30 rounded-full blur-3xl top-20 left-10"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl bottom-10 right-20"
          animate={{ y: [0, -40, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-xl max-w-[1440px] w-full mx-auto p-8 md:p-16 text-center mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex flex-col md:flex-row items-center justify-center gap-2">
          Welcome back,{" "}
          <span className="text-primary font-bold flex items-center gap-2">
            {user?.name || "User"}
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="inline-block origin-[70%_70%]"
            >
              👋
            </motion.span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-600">Total Tickets</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.total}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 border border-green-200 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-600">Open Tickets</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {stats.open}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-amber-100 border border-amber-200 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-600">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-amber-700 mt-2">
              {stats.inProgress}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-600">
              Closed Tickets
            </h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.resolved}
            </p>
          </motion.div>
        </div>

        <div className="mt-4">
          <Link
            to="/tickets"
            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform"
          >
            Go to Ticket Management
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
