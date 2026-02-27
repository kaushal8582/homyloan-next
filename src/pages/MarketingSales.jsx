import React from 'react';
import Navbar from '../Components/Navbar';
import MarketingSales from '../Components/MarketingSales';
import SubscribeSection from '../Components/SubscribeSection';
import Footer from '../Components/Footer';

const MarketingSalesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <MarketingSales />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default MarketingSalesPage;
