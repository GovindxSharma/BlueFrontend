import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [form, setForm] = useState({
    concern: "",
    cause: "",
    solution: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // refs for textareas
  const concernRef = useRef(null);
  const causeRef = useRef(null);
  const solutionRef = useRef(null);

  // function to adjust height dynamically
  const adjustHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto"; // reset height
      ref.current.style.height = ref.current.scrollHeight + "px"; // set to scrollHeight
    }
  };

  // call adjustHeight on every input change and initial render
  useEffect(() => {
    adjustHeight(concernRef);
  }, [form.concern]);

  useEffect(() => {
    adjustHeight(causeRef);
  }, [form.cause]);

  useEffect(() => {
    adjustHeight(solutionRef);
  }, [form.solution]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:4000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("🌈 Thought shared beautifully!");
        setForm({ concern: "", cause: "", solution: "" });
      } else {
        setMessage("❌ Couldn't submit, try again?");
      }
    } catch (error) {
      setMessage("❌ Network error, please retry.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-500 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-10 max-w-lg w-full space-y-8 animate-fadeIn"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-sm">
          What’s on Your Mind?
        </h1>

        <div>
          <label className="block font-semibold text-indigo-900 mb-3 text-lg">
            🌧️ What’s Troubling You?
          </label>
          <textarea
            name="concern"
            ref={concernRef}
            value={form.concern}
            onChange={handleChange}
            required
            placeholder="Describe your concern..."
            rows={1}
            className="w-full p-4 rounded-2xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-coral-400 transition shadow-sm text-lg resize-none placeholder:text-indigo-400 overflow-hidden"
          />
        </div>

        <div>
          <label className="block font-semibold text-indigo-900 mb-3 text-lg">
            🌊 Behind the Storm
          </label>
          <textarea
            name="cause"
            ref={causeRef}
            value={form.cause}
            onChange={handleChange}
            required
            placeholder="Describe the cause..."
            rows={1}
            className="w-full p-4 rounded-2xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-coral-400 transition shadow-sm text-lg resize-none placeholder:text-indigo-400 overflow-hidden"
          />
        </div>

        <div>
          <label className="block font-semibold text-indigo-900 mb-3 text-lg">
            🌈 A Ray of Hope
          </label>
          <textarea
            name="solution"
            ref={solutionRef}
            value={form.solution}
            onChange={handleChange}
            required
            placeholder="Your suggested fix..."
            rows={1}
            className="w-full p-4 rounded-2xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-coral-400 transition shadow-sm text-lg resize-none placeholder:text-indigo-400 overflow-hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-3xl font-extrabold text-white transition shadow-lg ${
            loading
              ? "bg-coral-300 cursor-not-allowed"
              : "bg-gradient-to-r from-coral-500 via-pink-500 to-rose-500 hover:brightness-110"
          }`}
        >
          {loading ? "Sharing..." : "Share Thought"}
        </button>

        {message && (
          <p
            className={`mt-6 text-center font-semibold ${
              message.startsWith("❌") ? "text-red-600" : "text-coral-600"
            } animate-pulse drop-shadow-md`}
          >
            {message}
          </p>
        )}
      </form>

      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(30px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Custom coral color */
          :root {
            --coral: #ff6b6b;
          }

          /* Custom coral focus ring */
          .focus\\:ring-coral-400:focus {
            --tw-ring-color: #ff8787;
          }

          /* Background colors */
          .bg-coral-300 {
            background-color: #ff8a8a;
          }

          .bg-coral-500 {
            background-color: #ff6b6b;
          }

          .text-coral-600 {
            color: #d94f4f;
          }
        `}
      </style>
    </div>
  );
}
