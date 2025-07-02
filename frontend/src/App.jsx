// frontend/src/App.jsx
import React from 'react';
import Header from '../common/Header';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Header />
      {/* You can add other sections like Hero, Footer etc. here */}
    </div>
  );
}

export default App;
