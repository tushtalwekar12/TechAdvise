import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaClipboardList,
} from "react-icons/fa";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
  file: null,
};

const serviceOptions = ["Website", "App", "SEO", "Design", "Other"];
const budgetOptions = [
  "",
  "Less than $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "Above $10,000",
];
const timelineOptions = [
  "",
  "ASAP",
  "Within 1 month",
  "1-3 months",
  "Flexible",
];

const QuoteRequestSection = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const res = await fetch("/api/quotes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Quote request sent successfully!");
        setForm(initialForm);
        window.open("/thank-you", "_blank");
      } else {
        setError(data.message || "Failed to send quote request.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-[#111518] text-3xl font-bold mb-2 text-center flex items-center justify-center gap-2">
        <FaClipboardList className="text-[#0b80ee]" /> Get a Quote
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Fill out the form below and we’ll get back to you soon!
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex flex-col gap-8 bg-white p-10 rounded-2xl border shadow-lg"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 font-medium mb-2">
              <FaUser /> Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center gap-2 font-medium mb-2">
              <FaEnvelope /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="flex items-center gap-2 font-medium mb-2">
              <FaPhone /> Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="font-medium mb-2 block">Service Required</label>
            <select
              id="service"
              name="service"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.service}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="font-medium mb-2 block">Budget Range</label>
            <select
              id="budget"
              name="budget"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.budget}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Budget Range (optional)</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Timeline */}
          <div>
            <label htmlFor="timeline" className="font-medium mb-2 block">Timeline</label>
            <select
              id="timeline"
              name="timeline"
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              value={form.timeline}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Timeline (optional)</option>
              {timelineOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Project Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="font-medium mb-2 block">Project Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your project needs..."
              className="p-3 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition min-h-[120px]"
              value={form.description}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* File Upload */}
          <div className="md:col-span-2">
            <label htmlFor="file" className="flex items-center gap-2 font-medium mb-2">
              <FaFileUpload /> Upload Brief (PDF/DOC, optional)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="p-2 border rounded w-full focus:outline-[#0b80ee] hover:border-[#0b80ee] transition"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0b80ee] text-white font-bold px-8 py-3 rounded hover:bg-blue-600 transition-colors shadow mt-4"
          disabled={loading}
        >
          {loading ? "Sending..." : "Request Quote"}
        </button>

        {/* Messages */}
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </section>
  );
};

export default QuoteRequestSection;
