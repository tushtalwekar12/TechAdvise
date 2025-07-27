// frontend/src/components/QuoteRequestSection.jsx
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaClipboardList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { submitQuote, resetQuoteState } from "../features/quote/quoteSlice";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const serviceOptions = [
  "Web Development",
  "App Development",
  "SEO",
  "Marketing",
  "Other",
];

const QuoteRequestSection = ({ onSubmitSuccess, onFormInteraction }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const { loading, success, error } = useSelector((state) => state.quote);

  const handleChange = (e) => {
    onFormInteraction?.();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitQuote(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        onSubmitSuccess?.();
        setFormData(initialForm);
        setTimeout(() => dispatch(resetQuoteState()), 3000);
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Request a Free Quote
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex items-center border rounded p-2">
          <FaUser className="mr-2 text-gray-500" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded p-2">
          <FaEnvelope className="mr-2 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded p-2">
          <FaPhone className="mr-2 text-gray-500" />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        <div className="border rounded p-2">
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full outline-none"
          >
            <option value="">Select a Service</option>
            {serviceOptions.map((service, idx) => (
              <option key={idx} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 border rounded p-2">
          <textarea
            name="message"
            placeholder="Describe your project"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full outline-none resize-none"
          ></textarea>
        </div>

        {error && (
          <p className="col-span-2 text-red-600 text-sm mt-2">{error}</p>
        )}
        {success && (
          <p className="col-span-2 text-green-600 text-sm mt-2">
            Quote submitted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default QuoteRequestSection;
