import React from 'react';
import HeroSection from '../components/HeroSection';
import HighlightsSection from '../components/common/HighlightsSection';
import TestimonialSection from '../components/common/TestimonialSection';
import BlogSection from "../components/BlogSection";
import StayUpdatedSection from "../components/StayUpdatedSection";
import QuoteRequestSection from '../components/QuoteRequestSection';
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Top Web Development & IT Services Company | TechAdvise</title>
        <meta name="description" content="TechAdvise is a leading web development agency offering IT solutions, mobile app development, cloud hosting, and SEO services for startups and enterprises in India." />
        <meta name="keywords" content="web development, website development, web development company, IT services, mobile app development company, cloud hosting India, IT support, SEO services India" />
        <meta property="og:title" content="Top Web Development & IT Services Company | TechAdvise" />
        <meta property="og:description" content="Full-stack development, mobile apps, cloud solutions & IT support for your digital growth. Get started with TechAdvise today!" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Web Development & IT Services Company | TechAdvise" />
        <meta name="twitter:description" content="TechAdvise is your digital partner for web development, mobile app development, cloud migration, and IT support in India." />
      </Helmet>
      <HeroSection/>
      <HighlightsSection />
      <TestimonialSection />
      <BlogSection />
      {/* Remove duplicate Get a Quote button and modal here */}
      <StayUpdatedSection />
    </>
  );
};

export default HomePage;