import React from 'react';
import { Link } from 'react-router-dom';

const ICON_SVGS = {
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="..."></path>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="..."></path>
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="..."></path>
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="..."></path>
    </svg>
  ),
};

const isInternalLink = (url) => /^\/(?!\/)/.test(url); // e.g. "/about", "/contact"

const Footer = () => {
  // Footer content is now static and defined directly in the component.
  const footerData = {
    links: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about' },
      { label: 'Services', url: '/services' },
      { label: 'Contact', url: '/contact' },
      { label: 'Privacy Policy', url: '/privacy-policy' },
      { label: 'Terms of Service', url: '/terms-of-service' },
    ],
    social: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
    copyright: `© ${new Date().getFullYear()} TechAdvise. All Rights Reserved.`,
  };

  return (
    <footer className="bg-gray-100 py-10 px-5 text-center">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {footerData.links.map((link, idx) =>
            isInternalLink(link.url) ? (
              <Link
                key={idx}
                to={link.url}
                className="text-[#60768a] text-base font-normal hover:text-blue-600"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#60768a] text-base font-normal hover:text-blue-600"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4">
          {footerData.social.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60768a] hover:text-blue-600"
              aria-label={soc.platform}
            >
              {ICON_SVGS[soc.platform] ?? (
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 ..."></path>
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[#60768a] text-sm font-normal">{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
