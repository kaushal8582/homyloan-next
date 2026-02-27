"use client";
import React, { useState, useEffect } from "react";
import { getPageContent } from "@/services/pageContentApi";
import Navbar from "@/components/Navbar";
import ConventionalLoan from "@/components/ConventionalLoan";
import ConventionalWhat from "@/components/ConventionalWhat";
import ConventionalKeyBenifit from "@/components/ConventionalKeyBenifit";
import ConventionalRequirement from "@/components/ConventionalRequirement";
import ConventionalPMI from "@/components/ConventionalPMI";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const ConventionalLoanPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("conventional-loan").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <ConventionalLoan content={content?.hero} />
      <ConventionalWhat content={content?.whatIs} />
      <ConventionalKeyBenifit content={content?.keyBenefit} />
      <ConventionalRequirement content={content?.requirement} />
      <ConventionalPMI content={content?.pmi} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default ConventionalLoanPage

