// frontend/common/Hero.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroSection } from '../features/heroSection/heroSectionSlice';
import { Helmet } from "react-helmet";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector(state => state.heroSection);

  useEffect(() => {
    dispatch(fetchHeroSection());
  }, [dispatch]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading hero section...</div>;
  if (error) return <div className="flex justify-center items-center min-h-[40vh] text-red-600">Error: {error}</div>;
  if (!content) return null;

  return (
    <>
      <Helmet>
        <title>{content?.title || "Home | TechAdvise"}</title>
        <meta name="description" content={content?.subtitle || "Welcome to TechAdvise, a modern digital agency empowering learners and creators."} />
        <meta property="og:title" content={content?.title || "Home | TechAdvise"} />
        <meta property="og:description" content={content?.subtitle || "Welcome to TechAdvise, a modern digital agency empowering learners and creators."} />
        {content?.image && <meta property="og:image" content={content.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content?.title || "Home | TechAdvise"} />
        <meta name="twitter:description" content={content?.subtitle || "Welcome to TechAdvise, a modern digital agency empowering learners and creators."} />
        {content?.image && <meta name="twitter:image" content={content.image} />}
      </Helmet>
      <div className="w-full">
        <div className="p-2 sm:p-4">
          <div
             className="flex flex-col items-center justify-center gap-6 min-h-[70vh] sm:min-h-[80vh] rounded-2xl bg-no-repeat bg-center bg-cover text-center px-2 sm:px-4 md:px-8"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('${content.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQyFrptEy0eAafIoyFyL7EDPYuSGD4YetYZvD36DR5_mEVqVZ2f16g42nBOG4ov-qGtLpIzYJB6wJfFpncF98ZTtifdBHblF1bMVud9DrzmICQDNrR54qw40IQrdqUqailDO2Wl_08eRIxM-F9vRDVSyzpi_K4Mor_kF5qdIJfbg79p_R4rPNe1xN9mdcx505SQBCchpfl1MCgyUqS6ElXNzBR7m1Ery5jh0fJDfyt_z9IZXohsAxXcBIf6lXs64xV2SuFnMDWPQD'}')`,
               backgroundPosition: 'center top 35%',
             }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.02em]">
                {content.title}
              </h1>
              <h2 className="text-white text-xs sm:text-base font-normal leading-normal">
                {content.subtitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {content.ctaText && (
                <a href={content.ctaLink || '#'} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 sm:h-12 px-4 sm:px-5 bg-[#0b80ee] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">{content.ctaText}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
