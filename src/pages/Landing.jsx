import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Landing() {
  // Motion values to track mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into small offsets for each circle
  const translateX1 = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const translateY1 = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  const translateX2 = useTransform(mouseX, [0, window.innerWidth], [30, -30]);
  const translateY2 = useTransform(mouseY, [0, window.innerHeight], [20, -20]);
  const translateX3 = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const translateY3 = useTransform(mouseY, [0, window.innerHeight], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative bg-background min-h-screen flex flex-col justify-center items-center text-center overflow-hidden p-4">
      {/* SVG Wave Background */}
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
          className="absolute w-56 h-56 bg-blue-400/40 rounded-full blur-2xl top-20 left-10"
          style={{ x: translateX1, y: translateY1 }}
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-72 h-72 bg-indigo-500/40 rounded-full blur-2xl bottom-10 right-20"
          style={{ x: translateX2, y: translateY2 }}
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-32 h-32 bg-sky-400/40 rounded-full blur-xl top-1/2 left-1/3"
          style={{ x: translateX3, y: translateY3 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 mt-50 max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold md:text-5xl md:font-extrabold font-header text-gray-900">
          Welcome to <span className="text-primary">Afuni’s Tickets App</span>
        </h1>

        <p className="mt-3 text-lg md:text-2xl font-body text-gray-700">
          Manage your support tickets easily: create, track, and resolve
          requests with clarity and speed.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform border border-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-primary px-6 py-3 rounded-lg shadow border border-primary hover:bg-primary hover:text-white hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </div>

        <motion.p
          className="mt-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Empowering teams to stay connected and organized
        </motion.p>
      </motion.div>
    </section>
  );
}
