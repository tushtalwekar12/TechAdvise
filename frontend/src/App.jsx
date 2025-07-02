// frontend/src/App.jsx
import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import './App.css';

function App({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default App;
