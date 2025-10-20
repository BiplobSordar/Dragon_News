import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-sky-700 mb-6">
        Contact Us
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none transition"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none transition resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
