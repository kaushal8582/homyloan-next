"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "@/services/pageContentApi";
import Navbar from "@/components/Navbar";
import RefinanceSection from "@/components/Refinance2comp";
import ProgramOptions from "@/components/ProgramOptions";
import RefinanceHome from "@/components/RefinanceHome";
import RefinanceWhen from "@/components/RefinanceWhen";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const Refinance2 = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("refinance2").then(setContent);
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <RefinanceSection content={content} />
      <ProgramOptions content={content?.programOptions} />
      <RefinanceHome content={content} />
      <RefinanceWhen content={content?.when} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Refinance2;
