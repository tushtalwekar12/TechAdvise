import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ServicePage from '../pages/ServicePage';
import IntershipPage from '../pages/IntershipPage';
import ResourcesPage from '../pages/ResourcesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import App from '../src/App';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicePage />} />
      <Route path="internships" element={<IntershipPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/services" element={<ServicePage />} />
      {/* Add more routes here */}
    </Route>
  </Routes>
);

export default AppRoutes;