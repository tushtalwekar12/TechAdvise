// frontend/common/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full">
      <div className="p-2 sm:p-4">
        <div
           className="flex flex-col items-center justify-center gap-6 min-h-[70vh] sm:min-h-[80vh] rounded-2xl bg-no-repeat bg-center bg-cover text-center px-2 sm:px-4 md:px-8"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
               url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwQyFrptEy0eAafIoyFyL7EDPYuSGD4YetYZvD36DR5_mEVqVZ2f16g42nBOG4ov-qGtLpIzYJB6wJfFpncF98ZTtifdBHblF1bMVud9DrzmICQDNrR54qw40IQrdqUqailDO2Wl_08eRIxM-F9vRDVSyzpi_K4Mor_kF5qdIJfbg79p_R4rPNe1xN9mdcx505SQBCchpfl1MCgyUqS6ElXNzBR7m1Ery5jh0fJDfyt_z9IZXohsAxXcBIf6lXs64xV2SuFnMDWPQD')`,
             backgroundPosition: 'center top 35%',
           }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.02em]">
              Unlock Your Potential with TechAdvise
            </h1>
            <h2 className="text-white text-xs sm:text-base font-normal leading-normal">
              Your journey to career success starts here. Explore internships, jobs, virtual classes, and expert guidance tailored to your aspirations. Our goal is to provide IT-related services, internships, and placement preparation resources.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 sm:h-12 px-4 sm:px-5 bg-[#0b80ee] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Get Started</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 sm:h-12 px-4 sm:px-5 bg-[#f0f2f5] text-[#111518] text-sm sm:text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Explore Services</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
