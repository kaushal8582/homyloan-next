"use client";
import React, { useState, useEffect } from "react";
import { getPageContent } from "@/services/pageContentApi";
import Navbar from "@/components/Navbar";
import HomeSelect from "@/components/HomeSelect";
import HomeSelectWhat from "@/components/HomeSelectWhat";
import HomeSelectBenifit from "@/components/HomeSelectBenifit";
import HomeSelectRequirement from "@/components/HomeSelectRequirement";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const HomeSelectPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("home-select").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <HomeSelect content={content?.hero} />
      <HomeSelectWhat content={content?.whatIs} />
      <HomeSelectBenifit content={content?.benefit} />
      <HomeSelectRequirement content={content?.requirement} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default HomeSelectPage

