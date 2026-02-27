"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import USDA from "@/components/USDA";
import USDAWhatHero from "@/components/USDAWhatHero";
import TopUSDAHero from "@/components/TopUSDAHero";
import USDARequirementHero from "@/components/USDARequirementHero";
import { getPageContent } from "@/services/pageContentApi";

const USDAPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("usda").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <USDA content={content} />
      <USDAWhatHero content={content} />
      <TopUSDAHero content={content} />
      <USDARequirementHero content={content} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default USDAPage;
