import React from 'react'
import Navbar from '../Components/Navbar'
import LoanOfficer from '../Components/LoanOfficer'
import LoanOfficerHow from '../Components/LoanOfficerHow'
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const BecomingLoanOfficer = () => {
  return (
    <div>
      <Navbar/>
      <LoanOfficer/>
      <LoanOfficerHow/>
    <SubscribeSection/>
    <Footer/>
    </div>
  )
}

export default BecomingLoanOfficer
