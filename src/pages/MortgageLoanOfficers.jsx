import React from 'react';
import Navbar from '../Components/Navbar';
import MortgageLoanOfficers from '../Components/MortgageLoanOfficers';
import SubscribeSection from '../Components/SubscribeSection';
import Footer from '../Components/Footer';

const MortgageLoanOfficersPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <MortgageLoanOfficers />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default MortgageLoanOfficersPage;
