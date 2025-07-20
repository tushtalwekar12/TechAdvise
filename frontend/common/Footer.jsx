import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooterContent } from '../features/footer/footerSlice';

const ICON_MAP = {
  facebook: <i className="ph ph-facebook-logo"></i>,
  twitter: <i className="ph ph-twitter-logo"></i>,
  linkedin: <i className="ph ph-linkedin-logo"></i>,
  instagram: <i className="ph ph-instagram-logo"></i>,
  github: <i className="ph ph-github-logo"></i>,
};

const Footer = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector(state => state.footer);

  useEffect(() => {
    dispatch(fetchFooterContent());
  }, [dispatch]);

  if (loading) return <footer className="py-8 text-center">Loading footer...</footer>;
  if (error) return <footer className="py-8 text-center text-red-600">Error: {error}</footer>;
  if (!content) return null;

  return (
    <footer className="bg-[#f0f2f5] py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-[#111518] font-bold text-lg">TeachAdvise</div>
          {content.links && (
            <div className="flex gap-4 mt-2">
              {content.links.map((link, idx) => (
                <a key={idx} href={link.url} className="text-[#60768a] hover:text-blue-600 text-sm font-medium">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          {content.social && content.social.map((soc, idx) => (
            <a key={idx} href={soc.url} target="_blank" rel="noopener noreferrer" className="text-[#60768a] hover:text-blue-600 text-2xl">
              {ICON_MAP[soc.platform] || <i className="ph ph-globe"></i>}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-[#60768a] text-xs mt-6">
        {content.copyright}
      </div>
    </footer>
  );
};

export default Footer;