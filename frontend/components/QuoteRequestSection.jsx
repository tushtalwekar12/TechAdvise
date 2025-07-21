import React, { useState } from "react";

const initialForm = { name: '', email: '', phone: '', service: '', message: '' };

const QuoteRequestSection = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Quote request sent successfully!");
        setForm(initialForm);
      } else {
        setError(data.message || "Failed to send quote request.");
      }
    } catch (err) {
      setError("Failed to send quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-white">
      <h2 className="text-[#111518] text-2xl font-bold mb-4">Get a Quote</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4 bg-gray-50 p-6 rounded-xl border">
        <input
          className="p-2 border rounded"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="p-2 border rounded"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="p-2 border rounded"
          name="phone"
          placeholder="Your Phone"
          value={form.phone}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="p-2 border rounded"
          name="service"
          placeholder="Service Type"
          value={form.service}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <textarea
          className="p-2 border rounded"
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-[#0b80ee] text-white font-bold px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Request Quote"}
        </button>
        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </section>
  );
};

export default QuoteRequestSection; 