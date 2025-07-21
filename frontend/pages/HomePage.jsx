import React from 'react';
import HeroSection from '../components/HeroSection';
import HighlightsSection from '../common/HighlightsSection';
import TestimonialSection from '../common/TestimonialSection';
import BlogSection from "../components/BlogSection";
import StayUpdatedSection from "../components/StayUpdatedSection";
import QuoteRequestSection from '../components/QuoteRequestSection';
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | TechAdvise</title>
        <meta name="description" content="Welcome to TechAdvise, a modern digital agency empowering learners and creators." />
        <meta property="og:title" content="Home | TechAdvise" />
        <meta property="og:description" content="Welcome to TechAdvise, a modern digital agency empowering learners and creators." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | TechAdvise" />
        <meta name="twitter:description" content="Welcome to TechAdvise, a modern digital agency empowering learners and creators." />
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