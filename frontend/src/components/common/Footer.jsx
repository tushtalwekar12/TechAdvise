import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-5 text-center">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-6">
        
        {/* Static Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/about" className="text-[#60768a] text-base font-normal hover:text-blue-600">
            About Us
          </Link>
          <Link to="/privacy-policy" className="text-[#60768a] text-base font-normal hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-[#60768a] text-base font-normal hover:text-blue-600">
            Terms & Conditions
          </Link>
          <Link to="/contact" className="text-[#60768a] text-base font-normal hover:text-blue-600">
            Contact Us
          </Link>
        </div>

        {/* Static Social Icons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://twitter.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#60768a] hover:text-blue-600"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.48 8.48 0 01-2.71 1.03A4.23 4.23 0 0015.5 4c-2.34 0-4.23 1.9-4.23 4.24 0 .33.04.66.1.97A12.01 12.01 0 013 5.14a4.24 4.24 0 001.31 5.65 4.25 4.25 0 01-1.91-.53v.05c0 2.05 1.46 3.76 3.4 4.14a4.23 4.23 0 01-1.91.07 4.24 4.24 0 003.95 2.94A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.69 0-.18-.01-.36-.02-.54A8.3 8.3 0 0022.46 6z" />
            </svg>
          </a>

          <a
            href="https://facebook.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#60768a] hover:text-blue-600"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.2v-2.88h2.2V9.41c0-2.17 1.29-3.37 3.27-3.37.94 0 1.92.17 1.92.17v2.1h-1.08c-1.07 0-1.4.66-1.4 1.34v1.61h2.38l-.38 2.88h-2v6.99A10 10 0 0022 12z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/techadvise.in/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#60768a] hover:text-blue-600"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2C4.68 2 2 4.68 2 7.75v8.5C2 19.32 4.68 22 7.75 22h8.5C19.32 22 22 19.32 22 16.25v-8.5C22 4.68 19.32 2 16.25 2h-8.5zM4 7.75C4 5.68 5.68 4 7.75 4h8.5C18.32 4 20 5.68 20 7.75v8.5C20 18.32 18.32 20 16.25 20h-8.5C5.68 20 4 18.32 4 16.25v-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#60768a] hover:text-blue-600"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5 2.5 2.5 0 000-5zM2.5 21h5v-12h-5v12zm7 0h5v-6.5c0-1.6.6-2.5 2-2.5s2 .9 2 2.5V21h5v-6.5c0-3.4-1.8-5-4.5-5a4.5 4.5 0 00-4 2v-1.5h-5V21z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[#60768a] text-sm font-normal">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
