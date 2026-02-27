"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import HELOC from "../Components/HELOC";
import HELOCWhat from "../Components/HELOCWhat";
import HELOCPrograms from "../Components/HELOCPrograms";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const HELOCPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("heloc").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <HELOC content={content?.hero} />
      <HELOCWhat content={content?.whatIs} />
      <HELOCPrograms content={content?.programs} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default HELOCPage

