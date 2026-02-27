"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RefinanceSection from "@/components/Refinance";
import RefinanceHome from "@/components/RefinanceHome";
import RefinanceRightTime from "@/components/RefinanceRightTime";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import Mortgage_Refinance from "@/components/Mortgage_Refinance";
import { getPageContent } from "@/services/pageContentApi";

function Refinance() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("refinance").then(setContent);
  }, []);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <RefinanceSection content={content} />
      <Mortgage_Refinance content={content} />
      <RefinanceHome content={content} />
      <RefinanceRightTime content={content} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Refinance;
