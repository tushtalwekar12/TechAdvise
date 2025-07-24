import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooterContent } from '../features/footer/footerSlice';

const ICON_SVGS = {
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
    </svg>
  ),
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
    <div>
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              {content.links && content.links.map((link, idx) => (
                <a
                  key={idx}
                  className="text-[#60768a] text-base font-normal leading-normal min-w-40"
                  href={link.url}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <div className="text-[#60768a]">{ICON_SVGS.twitter}</div>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                <div className="text-[#60768a]">{ICON_SVGS.facebook}</div>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                <div className="text-[#60768a]">{ICON_SVGS.instagram}</div>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <div className="text-[#60768a]">{ICON_SVGS.linkedin}</div>
              </a>
            </div>
            <p className="text-[#60768a] text-base font-normal leading-normal">
              {content.copyright}
            </p>
          </footer>
        </div>
      </footer>
    </div>
  );
};

export default Footer;


// these are the old dyamic content code 

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFooterContent } from '../features/footer/footerSlice';

// const ICON_MAP = {
//   facebook: <i className="ph ph-facebook-logo"></i>,
//   twitter: <i className="ph ph-twitter-logo"></i>,
//   linkedin: <i className="ph ph-linkedin-logo"></i>,
//   instagram: <i className="ph ph-instagram-logo"></i>,
//   github: <i className="ph ph-github-logo"></i>,
// };

// const Footer = () => {
//   const dispatch = useDispatch();
//   const { content, loading, error } = useSelector(state => state.footer);

//   useEffect(() => {
//     dispatch(fetchFooterContent());
//   }, [dispatch]);

//   if (loading) return <footer className="py-8 text-center">Loading footer...</footer>;
//   if (error) return <footer className="py-8 text-center text-red-600">Error: {error}</footer>;
//   if (!content) return null;

//   return (
//     <footer className="bg-[#f0f2f5] py-8 px-4 mt-12">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         <div className="flex flex-col items-center md:items-start gap-2">
//           <div className="text-[#111518] font-bold text-lg">TeachAdvise</div>
//           {content.links && (
//             <div className="flex gap-4 mt-2">
//               {content.links.map((link, idx) => (
//                 <a key={idx} href={link.url} className="text-[#60768a] hover:text-blue-600 text-sm font-medium">
//                   {link.label}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="flex gap-4 mt-4 md:mt-0">
//           {content.social && content.social.map((soc, idx) => (
//             <a key={idx} href={soc.url} target="_blank" rel="noopener noreferrer" className="text-[#60768a] hover:text-blue-600 text-2xl">
//               {ICON_MAP[soc.platform] || <i className="ph ph-globe"></i>}
//             </a>
//           ))}
//         </div>
//       </div>
//       <div className="text-center text-[#60768a] text-xs mt-6">
//         {content.copyright}
//       </div>
//     </footer>
//   );
// };

// export default Footer;