// frontend/src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { Outlet } from 'react-router-dom';
import BackToTopButton from './components/BackToTopButton';
import QuoteRequestSection from './components/QuoteRequestSection';
import './App.css';

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteFormFilled, setQuoteFormFilled] = useState(false);
  const timerRef = useRef(null); // Ref to manage the timer

  useEffect(() => {
    if (showQuoteModal && !quoteFormFilled) {
      timerRef.current = setTimeout(() => {
        setShowQuoteModal(false);
      }, 4000);
    }
    return () => clearTimeout(timerRef.current);
  }, [showQuoteModal, quoteFormFilled]);

  const handleOpenQuoteModal = () => {
    setQuoteFormFilled(false); // reset when opening
    setShowQuoteModal(true);
  };

  const handleQuoteSubmitSuccess = () => {
    setQuoteFormFilled(true); // form is filled and submitted
    setShowQuoteModal(false); // close modal
  };

  const handleFormInteraction = () => {
    // Cancel the 4-second auto-close if user starts typing
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Header openQuoteModal={handleOpenQuoteModal} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />

 {showQuoteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 overflow-auto p-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">

      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
        onClick={() => setShowQuoteModal(false)}
        aria-label="Close"
      >
        &times;
      </button>
      <QuoteRequestSection
        onSubmitSuccess={handleQuoteSubmitSuccess}
        onFormInteraction={handleFormInteraction}
      />
    </div>
  </div>
)}
    </div>
  );
}

export default App;
