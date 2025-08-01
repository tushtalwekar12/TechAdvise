import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import ServicePage from '../pages/ServicePage';
import IntershipPage from '../pages/IntershipPage';
import ResourcesPage from '../pages/ResourcesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';

// Admin
import AdminLoginPage from '../pages/admin/AdminLoginPage';
// import AdminSignupPage from '../pages/admin/AdminSignupPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';
import AdminBlogsPage from '../pages/admin/AdminBlogsPage';
import AdminTestimonialsPage from '../pages/admin/AdminTestimonialsPage';
import AdminServicesPage from '../pages/admin/AdminServicesPage';
import AdminAboutPage from '../pages/admin/AdminAboutPage';
import AdminResourcesPage from '../pages/admin/AdminResourcesPage';
import AdminHighlightsPage from '../pages/admin/AdminHighlightsPage';
import AdminHeroPage from '../pages/admin/AdminHeroPage';
import AdminContactInfoPage from '../pages/admin/AdminContactInfoPage';
import AdminFooterPage from '../pages/admin/AdminFooterPage';
import AdminFAQPage from '../pages/admin/AdminFAQPage';
import AdminQuotesPage from '../pages/admin/AdminQuotesPage';
import AdminContactPage from '../pages/admin/AdminContactPage';
import AdminIntershipPage from '../pages/admin/AdminIntershipPage';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes with Main Layout */}
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicePage />} />
      <Route path="internships" element={<IntershipPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="terms-of-service" element={<TermsOfServicePage />} />
      <Route path="blog/:id" element={<BlogDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>

    {/* Standalone Admin Login/Signup Routes */}
    <Route path="/admin/login" element={<AdminLoginPage />} />
    {/* <Route path="/admin/signup" element={<AdminSignupPage />} /> */}

    {/* Protected Admin Dashboard Routes */}
    <Route
      path="/admin/dashboard"
      element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      }
    >
      <Route path="blogs" element={<AdminBlogsPage />} />
      <Route path="testimonials" element={<AdminTestimonialsPage />} />
      <Route path="services" element={<AdminServicesPage />} />
      <Route path="about" element={<AdminAboutPage />} />
      <Route path="resources" element={<AdminResourcesPage />} />
      <Route path="highlights" element={<AdminHighlightsPage />} />
      <Route path="hero" element={<AdminHeroPage />} />
      <Route path="contact" element={<AdminContactInfoPage />} />
      <Route path="footer" element={<AdminFooterPage />} />
      <Route path="faq" element={<AdminFAQPage />} />
      <Route path="quotes" element={<AdminQuotesPage />} />
      <Route path="contact-forms" element={<AdminContactPage />} />
      <Route path="intership-page" element={<AdminIntershipPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;