// frontend/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = ({ openQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 md:px-10 py-3 relative">
      <div className="flex items-center gap-4 text-[#111418]">
        {/* <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div> */}
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
          TechAdvise
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 md:gap-9">
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/">Home</Link>
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/services">Services</Link>
          {/* <Link className="text-[#111418] text-sm font-medium leading-normal" to="/resources">Resources</Link> */}
          <Link className="text-[#111418] text-sm font-medium leading-normal" to="/internships">Career</Link>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center px-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[#111418]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={openQuoteModal}
          >
            <span className="truncate">Get Quotes</span>
          </button>
        </div>
      </div>
      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-4 gap-4 md:hidden z-50 animate-fade-in">
          <Link className="text-[#111418] text-base font-medium leading-normal w-full" to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link className="text-[#111418] text-base font-medium leading-normal w-full" to="/internships" onClick={() => setMobileMenuOpen(false)}>Career</Link>
          {/* <Link className="text-[#111418] text-base font-medium leading-normal w-full" to="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link> */}
          <Link className="text-[#111418] text-base font-medium leading-normal w-full" to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
