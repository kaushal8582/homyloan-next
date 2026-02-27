import React from 'react';
import Navbar from '../Components/Navbar';
import OpenPositions from '../Components/OpenPositions';
import SubscribeSection from '../Components/SubscribeSection';
import Footer from '../Components/Footer';

const OpenPositionsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <OpenPositions />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default OpenPositionsPage;
