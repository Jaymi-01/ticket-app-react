import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authentication.js";

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Load tickets from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(stored);
  }, []);

  // Save tickets to localStorage and update state instantly
  const saveTickets = (updated) => {
    localStorage.setItem("tickets", JSON.stringify(updated));
    setTickets(updated);
  };

  // Create or Update ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    let updatedTickets;
    if (editingIndex !== null) {
      updatedTickets = tickets.map((t, i) =>
        i === editingIndex ? { ...t, ...form } : t
      );
      toast.success("Ticket updated!");
      setEditingIndex(null);
    } else {
      updatedTickets = [...tickets, { ...form, id: Date.now() }];
      toast.success("Ticket created!");
    }

    saveTickets(updatedTickets);
    setForm({ title: "", description: "", status: "open" });
  };

  // Delete ticket
  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((_, i) => i !== index);
      saveTickets(updatedTickets);
      toast.success("Ticket deleted!");
    }
  };

  // Edit ticket
  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(tickets[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sync with localStorage if changed elsewhere
  useEffect(() => {
    const syncTickets = () => {
      const latest = JSON.parse(localStorage.getItem("tickets")) || [];
      setTickets(latest);
    };
    window.addEventListener("storage", syncTickets);
    return () => window.removeEventListener("storage", syncTickets);
  }, []);

  return (
    <section className="relative bg-background min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Background Wave */}
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
          animate={{ y: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl bottom-10 right-20"
          animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-xl max-w-[1440px] w-full mx-auto p-6 sm:p-8 md:p-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Ticket Management
          </h1>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
          >
            Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8"
        >
          <input
            type="text"
            placeholder="Ticket Title"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingIndex !== null ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No tickets found. Create your first ticket above!
            </p>
          ) : (
            tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md text-left"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {ticket.title}
                </h3>
                <p className="text-gray-600 mb-4">{ticket.description}</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    ticket.status === "open"
                      ? "bg-green-100 text-green-800"
                      : ticket.status === "in-progress"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {ticket.status}
                </span>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}
