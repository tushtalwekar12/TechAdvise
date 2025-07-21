// frontend/src/App.jsx
import React, { useState } from 'react';
import Header from '../common/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';
import BackToTopButton from "../components/BackToTopButton";
import QuoteRequestSection from '../components/QuoteRequestSection';

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Header openQuoteModal={() => setShowQuoteModal(true)} />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer/>
      <BackToTopButton />
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
              onClick={() => setShowQuoteModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <QuoteRequestSection />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
