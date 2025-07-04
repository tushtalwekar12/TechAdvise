import React from 'react'
import HeroSection from '../components/HeroSection';
import HighlightsSection from '../common/HighlightsSection';
import TestimonialSection from '../common/TestimonialSection';
import BlogSection from "../components/BlogSection";
import StayUpdatedSection from "../components/StayUpdatedSection";

const HomePage = () => {
  return (
    <div >
      <HeroSection/>
      <HighlightsSection />
      <TestimonialSection />
      <BlogSection />
      <StayUpdatedSection />
    </div>
  )
}

export default HomePage