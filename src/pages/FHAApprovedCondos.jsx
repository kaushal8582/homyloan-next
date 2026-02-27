"use client";
import React, { useState, useEffect } from "react";
import { getPageContent } from "@/services/pageContentApi";
import Navbar from "@/components/Navbar";
import FHAApprovedCondos from "@/components/FHAApprovedCondos";
import FHAApprovedCondosWhat from "@/components/FHAApprovedCondosWhat";
import FHAApprovedCondosRequirement from "@/components/FHAApprovedCondosRequirement";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const FHAApprovedCondosPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fha-approved-condos").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FHAApprovedCondos content={content?.hero} />
      <FHAApprovedCondosWhat content={content?.whatIs} />
      <FHAApprovedCondosRequirement content={content?.requirement} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default FHAApprovedCondosPage

