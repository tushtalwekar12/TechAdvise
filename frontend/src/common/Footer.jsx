import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFooterContent } from '../features/footer/footerSlice';

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
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(fetchFooterContent());
  }, [dispatch]);

  if (loading) return <footer className="py-8 text-center">Loading footer...</footer>;
  if (error) return <footer className="py-8 text-center text-red-600">Error: {error}</footer>;
  if (!content) return null;

  return (
    <footer className="bg-gray-100 py-10 px-5 text-center">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {content.links?.map((link, idx) =>
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
          {content.social?.map((soc, idx) => (
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
        <p className="text-[#60768a] text-sm font-normal">{content?.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
