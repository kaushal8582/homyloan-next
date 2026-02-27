import React from 'react';
import Navbar from '../Components/Navbar';
import BranchManagers from '../Components/BranchManagers';
import SubscribeSection from '../Components/SubscribeSection';
import Footer from '../Components/Footer';

const BranchManagersPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BranchManagers />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default BranchManagersPage;
