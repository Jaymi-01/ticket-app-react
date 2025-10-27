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
    <div className="relative bg-background min-h-screen overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-transparent backdrop-blur-sm shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
               Afuni's Tickets
            </h1>
            
          </div>
        </div>
      </motion.header>

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

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-20 pb-16">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold md:text-5xl md:font-extrabold font-header text-gray-900">
            Welcome to <span className="text-primary">Afuni's Tickets App</span>
          </h2>

          <p className="mt-4 text-lg md:text-2xl font-body text-gray-700">
            Manage your support tickets easily: create, track, and resolve
            requests with clarity and speed.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform border border-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-primary px-8 py-3 rounded-lg shadow-lg border border-primary hover:bg-primary hover:text-white hover:scale-105 transition-transform"
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

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Your Team
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">📝</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Easy Ticket Creation
              </h4>
              <p className="text-gray-600">
                Create and submit tickets in seconds with our intuitive interface. 
                No complex forms, just simple and efficient.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-600"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Real-Time Tracking
              </h4>
              <p className="text-gray-600">
                Monitor ticket status in real-time with live updates. 
                Stay informed about every change instantly.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-700"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Lightning Fast
              </h4>
              <p className="text-gray-600">
                Built for speed and performance. Access your tickets instantly 
                without delays or loading screens.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Afuni's Tickets?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🔐</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Secure & Private
                </h4>
                <p className="text-gray-600 text-sm">
                  Your data stays safe with secure authentication and private ticket storage.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">💻</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Fully Responsive
                </h4>
                <p className="text-gray-600 text-sm">
                  Works seamlessly on desktop, tablet, and mobile devices.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎨</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Beautiful UI
                </h4>
                <p className="text-gray-600 text-sm">
                  Modern, clean interface designed for the best user experience.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Zero Setup
                </h4>
                <p className="text-gray-600 text-sm">
                  Start managing tickets immediately. No complicated configuration needed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-12 text-white"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg mb-8 text-blue-100">
              Join thousands of teams already using Afuni's Tickets to streamline their support workflow.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Create Your Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Afuni's Tickets App. Built for better support management.
          </p>
        </div>
      </footer>
    </div>
  );
}