// frontend/src/components/QuoteRequestSection.jsx
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaClipboardList,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { submitQuote } from "../features/quote/quotesice";


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

const QuoteRequestSection = ({ onSubmitSuccess, onFormInteraction }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    onFormInteraction(); // stop the timer
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    onFormInteraction();
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitQuote(formData)); // dispatch Redux action
    onSubmitSuccess();
    setFormData(initialForm);
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
            name="description"
            placeholder="Describe your project"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full outline-none resize-none"
          ></textarea>
        </div>

        <div className="flex items-center border rounded p-2">
          <FaClipboardList className="mr-2 text-gray-500" />
          <input
            type="text"
            name="budget"
            placeholder="Estimated Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded p-2">
          <FaClipboardList className="mr-2 text-gray-500" />
          <input
            type="text"
            name="timeline"
            placeholder="Project Timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded p-2 col-span-1 md:col-span-2">
          <FaFileUpload className="mr-2 text-gray-500" />
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.png,.jpg"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default QuoteRequestSection;
