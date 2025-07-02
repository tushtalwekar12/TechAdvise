// frontend/common/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
           className="flex flex-col items-center justify-center gap-6 min-h-[80vh] rounded-2xl bg-no-repeat bg-center bg-cover text-center px-4"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
               url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwQyFrptEy0eAafIoyFyL7EDPYuSGD4YetYZvD36DR5_mEVqVZ2f16g42nBOG4ov-qGtLpIzYJB6wJfFpncF98ZTtifdBHblF1bMVud9DrzmICQDNrR54qw40IQrdqUqailDO2Wl_08eRIxM-F9vRDVSyzpi_K4Mor_kF5qdIJfbg79p_R4rPNe1xN9mdcx505SQBCchpfl1MCgyUqS6ElXNzBR7m1Ery5jh0fJDfyt_z9IZXohsAxXcBIf6lXs64xV2SuFnMDWPQD")`,
             backgroundPosition: 'center top 35%', // show more top area (adjust % if needed)
           }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Unlock Your Potential with TechAdvise
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Your journey to career success starts here. Explore internships, jobs, virtual classes, and expert guidance tailored to your aspirations. Our goal is to provide IT-related services, internships, and placement preparation resources.
            </h2>
          </div>
          <div className="flex-wrap gap-3 flex justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Get Started</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0f2f5] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Explore Services</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
