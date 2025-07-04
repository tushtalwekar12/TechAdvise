// frontend/src/App.jsx
import React from 'react';
import Header from '../common/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Header />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
}

export default App;
