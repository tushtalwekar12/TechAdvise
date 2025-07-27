import React from 'react';
import ResourcesSection from '../components/ResourcesSection';
import { Helmet } from "react-helmet-async";

const ResourcesPage = () => {
  return (
    <>
      <Helmet>
        <title>Resources | TechAdvise</title>
        <meta name="description" content="Explore valuable resources curated by TechAdvise for learners and creators." />
        <meta property="og:title" content="Resources | TechAdvise" />
        <meta property="og:description" content="Explore valuable resources curated by TechAdvise for learners and creators." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources | TechAdvise" />
        <meta name="twitter:description" content="Explore valuable resources curated by TechAdvise for learners and creators." />
      </Helmet>
      <div className="pt-6 px-4">
        <ResourcesSection />
      </div>
    </>
  );
};

export default ResourcesPage;
