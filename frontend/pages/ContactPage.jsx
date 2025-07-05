import React from 'react';

const ContactPage = () => {
  return (
    <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
      <div className="w-full max-w-[512px]">
        {/* Header Section */}
        <div className="p-4">
          <h1 className="text-3xl font-bold text-[#111518]">Contact Us</h1>
          <p className="text-sm text-[#60768a] mt-2">
            We're here to help! Reach out to us with any questions or feedback.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4 px-4 py-3">
          <div>
            <label className="block text-base font-medium text-[#111518] mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full h-14 p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#111518] mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full h-14 p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#111518] mb-2">Message</label>
            <textarea
              placeholder="Your Message"
              className="w-full min-h-[144px] p-4 rounded-xl bg-[#f0f2f5] placeholder:text-[#60768a] text-[#111518] outline-none resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-[#0b80ee] text-white font-bold text-sm rounded-full tracking-wide"
          >
            Submit
          </button>
        </form>

        {/* Contact Information */}
        <div className="px-4 pt-6 space-y-4">
          <h3 className="text-lg font-bold text-[#111518]">Contact Information</h3>

          <div className="flex items-center gap-4 bg-white py-2">
            <div className="bg-[#f0f2f5] text-[#111518] rounded-lg flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
              </svg>
            </div>
            <div>
              <p className="text-[#111518] font-medium">Email</p>
              <p className="text-sm text-[#60768a]">support@teachadvise.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white py-2">
            <div className="bg-[#f0f2f5] text-[#111518] rounded-lg flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4l-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l-.05-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z" />
              </svg>
            </div>
            <div>
              <p className="text-[#111518] font-medium">Phone</p>
              <p className="text-sm text-[#60768a]">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white py-2">
            <div className="bg-[#f0f2f5] text-[#111518] rounded-lg flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
              </svg>
            </div>
            <div>
              <p className="text-[#111518] font-medium">Address</p>
              <p className="text-sm text-[#60768a]">123 Career Street, Suite 456, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
