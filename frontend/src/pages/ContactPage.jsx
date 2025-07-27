import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactInfo } from '../features/contactInfo/contactInfoSlice';
import { submitContact, clearContactState } from '../features/contact/contactSlice';
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const dispatch = useDispatch();

  const { content, loading: infoLoading, error: infoError } = useSelector(state => state.contactInfo);
  const { loading: formLoading, error: formError, message: formSuccess } = useSelector(state => state.contact);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  useEffect(() => {
    if (formSuccess) {
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => dispatch(clearContactState()), 3000);
    }
  }, [formSuccess, dispatch]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContact(formData));
  };

  if (infoLoading) return <div className="flex justify-center items-center min-h-screen">Loading contact info...</div>;
  if (infoError) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {infoError}</div>;
  if (!content) return null;

  return (
    <>
      <Helmet>
        <title>Contact Us | TechAdvise</title>
        <meta name="description" content="Contact TechAdvise for inquiries, support, or partnership opportunities." />
      </Helmet>

      <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
        <div className="w-full max-w-[512px]">
          {/* Header */}
          <div className="p-4">
            <h1 className="text-3xl font-bold text-[#111518]">Contact Us</h1>
            <p className="text-sm text-[#60768a] mt-2">We're here to help! Reach out to us with any questions or feedback.</p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4 px-4 py-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-medium text-[#111518] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full h-14 p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#111518] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full h-14 p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#111518] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full min-h-[144px] p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className={`w-full h-10 ${formLoading ? 'bg-gray-400' : 'bg-[#0b80ee]'} text-white font-bold text-sm rounded-full tracking-wide`}
            >
              {formLoading ? 'Submitting...' : 'Submit'}
            </button>

            {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
            {formSuccess && <p className="text-green-600 text-sm mt-2">{formSuccess}</p>}
          </form>

          {/* Contact Information */}
          <div className="px-4 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-[#111518]">Contact Information</h3>

            {content.image && (
              <div className="flex justify-center mb-4">
                <img src={content.image} alt="Contact" className="w-32 h-32 object-cover rounded-full shadow" />
              </div>
            )}

            {content.email && (
              <ContactInfo icon="email" label="Email" value={content.email} />
            )}
            {content.phone && (
              <ContactInfo icon="phone" label="Phone" value={content.phone} />
            )}
            {content.address && (
              <ContactInfo icon="location" label="Address" value={content.address} />
            )}

            {content.mapEmbedUrl && (
              <div className="mt-6">
                <iframe
                  src={content.mapEmbedUrl}
                  title="Location Map"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable Contact Info Component
const ContactInfo = ({ icon, label, value }) => {
  const icons = {
    email: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Z..." /></svg>
    ),
    phone: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11..." /></svg>
    ),
    location: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A72,72,0,0,0,56,96c0,57.43..." /></svg>
    ),
  };

  return (
    <div className="flex items-center gap-4 bg-white py-2">
      <div className="bg-[#f0f2f5] text-[#111518] rounded-lg flex items-center justify-center w-12 h-12">
        {icons[icon]}
      </div>
      <div>
        <p className="text-[#111518] font-medium">{label}</p>
        <p className="text-sm text-[#60768a]">{value}</p>
      </div>
    </div>
  );
};

export default ContactPage;
