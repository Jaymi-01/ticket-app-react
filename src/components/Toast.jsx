import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
