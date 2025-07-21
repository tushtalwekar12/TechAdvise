import React from 'react';
import HeroSection from '../components/HeroSection';
import HighlightsSection from '../common/HighlightsSection';
import TestimonialSection from '../common/TestimonialSection';
import BlogSection from "../components/BlogSection";
import StayUpdatedSection from "../components/StayUpdatedSection";
import QuoteRequestSection from '../components/QuoteRequestSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <HighlightsSection />
      <TestimonialSection />
      <BlogSection />
      {/* Remove duplicate Get a Quote button and modal here */}
      <StayUpdatedSection />
    </div>
  );
};

export default HomePage;