"use client";

import React, { useState, useEffect } from 'react'
import { getPageContent } from '../services/pageContentApi'
import Navbar from '../Components/Navbar'
import FixedAdjustable from '../Components/FixedAdjustable'
import FixedAdjustableEligibility from '../Components/FixedAdjustableEligibility'
import Chatbot from '../Components/Chatbot'
import FAQSection from '../Components/Frequentlyaskedquestions'
import Footer from '../Components/Footer'

const FixedAdjustablePage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fixed-adjustable").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FixedAdjustable />
      <FixedAdjustableEligibility />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <Footer />
    </div>
  );
}

export default FixedAdjustablePage
