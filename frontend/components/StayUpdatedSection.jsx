import React from "react";

const StayUpdatedSection = () => {
  return (
    <section className="flex flex-col justify-end gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-20 bg-white">
      {/* Heading + Description */}
      <div className="flex flex-col gap-2 text-center items-center">
        <h2 className="text-[#111518] text-[32px] font-bold leading-tight md:text-4xl md:font-black md:tracking-[-0.033em] max-w-[720px]">
          Stay Updated
        </h2>
        <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
          Subscribe to our newsletter for the latest career tips and opportunities.
        </p>
      </div>

      {/* Email Input Form */}
      <div className="flex justify-center">
        <label className="flex w-full max-w-[480px] h-14 md:h-16">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 text-sm md:text-base text-[#111518] placeholder-[#60768a] bg-[#f0f2f5] rounded-l-xl focus:outline-none"
          />
          <button
            className="bg-[#0b80ee] text-white font-bold text-sm md:text-base px-5 rounded-r-xl hover:bg-blue-600 transition-colors"
          >
            Subscribe
          </button>
        </label>
      </div>
    </section>
  );
};

export default StayUpdatedSection;
