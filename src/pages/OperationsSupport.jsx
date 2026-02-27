import React from 'react';
import Navbar from '../Components/Navbar';
import OperationsSupport from '../Components/OperationsSupport';
import SubscribeSection from '../Components/SubscribeSection';
import Footer from '../Components/Footer';

const OperationsSupportPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <OperationsSupport />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default OperationsSupportPage;
