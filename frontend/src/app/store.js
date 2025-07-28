import { configureStore } from "@reduxjs/toolkit";
import internshipReducer from "../features/internships/internshipSlice";
import blogReducer from "../features/blogs/blogSlice";
import servicePageReducer from "../features/servicePage/servicePageSlice";
import aboutPageReducer from "../features/aboutPage/aboutPageSlice";
import resourcesReducer from "../features/resources/resourcesSlice";
import highlightsReducer from "../features/highlights/highlightsSlice";
import adminAuthReducer from "../features/admin/adminAuthSlice";
import heroSectionReducer from "../features/heroSection/heroSectionSlice";
import contactInfoReducer from "../features/contactInfo/contactInfoSlice";
import footerReducer from "../features/footer/footerSlice";
import faqReducer from "../features/faq/faqSlice";
import testimonialReducer from "../features/testimonials/testimonialSlice";
import quoteReducer from "../features/quote/quoteSlice";
import contactReducer from "../features/contact/contactSlice";

const store = configureStore({
  reducer: {
    internships: internshipReducer,
    blogs: blogReducer,
    servicePage: servicePageReducer,
    aboutPage: aboutPageReducer,
    resources: resourcesReducer,
    highlights: highlightsReducer,
    adminAuth: adminAuthReducer,
    heroSection: heroSectionReducer,
    contactInfo: contactInfoReducer,
    footer: footerReducer,
    faq: faqReducer,
    testimonials: testimonialReducer,
    quote: quoteReducer,
    contact: contactReducer,
  },
});

export default store;
