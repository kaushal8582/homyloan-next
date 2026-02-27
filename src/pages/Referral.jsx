import React from 'react'
import Navbar from '../Components/Navbar'
import ReferralTable from '../Components/ReferralTable'
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const Referral = () => {
  return (
    <div>
      <Navbar/>
      <ReferralTable/>
            <SubscribeSection />
            <Footer/>
    </div>
  )
}

export default Referral
