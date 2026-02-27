"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import FHALoan from "../Components/FHALoan";
import FHAWhat from "../Components/FHAWhat";
import FHAKeyBenifit from "../Components/FHAKeyBenifit";
import FHARequirement from "../Components/FHARequirement";
import Chatbot from "../Components/Chatbot";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const FHALoanPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fha-loan").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FHALoan content={content?.hero} />
      <FHAWhat content={content?.whatIs} />
      <FHAKeyBenifit content={content?.keyBenefit} />
      <FHARequirement content={content?.requirement} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default FHALoanPage

