// frontend/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
          TeachAdvise
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6 md:gap-9">
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/">Home</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/internships">Internships</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/jobs">Jobs</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/virtual-classes">Virtual Classes</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/resources">Resources</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/guidance">Guidance</Link>
        </div>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Sign Up</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
