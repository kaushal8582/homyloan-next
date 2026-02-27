"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import PhysicianLoan from "../Components/PhysicianLoan";
import PhysicianLoanOverview from "../Components/PhysicianLoanOverview";
import PhysicianLoanEligibility from "../Components/PhysicianLoanEligibility";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const PhysicianLoanPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("physician-loan").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <PhysicianLoan content={content?.hero} />
      <PhysicianLoanOverview content={content?.overview} />
      <PhysicianLoanEligibility content={content?.eligibility} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default PhysicianLoanPage

