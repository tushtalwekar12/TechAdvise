import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ServicePage from '../pages/ServicePage';
import IntershipPage from '../pages/IntershipPage';
import ResourcesPage from '../pages/ResourcesPage';
import App from '../src/App';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicePage />} />
      <Route path="internships" element={<IntershipPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      {/* Add more routes here */}
    </Route>
  </Routes>
);

export default AppRoutes;