"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ReverseMortgage from "@/components/ReverseMortgage";
import ReverseWhat from "@/components/ReverseWhat";
import ReverseWho from "@/components/ReverseWho";
import EligibilityRequirement from "@/components/EligibilityRequirement";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

const Reverse = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("reverse").then(setContent);
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <ReverseMortgage content={content} />
      </div>
      <ReverseWhat content={content} />
      <ReverseWho content={content} />
      <EligibilityRequirement content={content} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Reverse;
