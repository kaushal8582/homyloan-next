"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import FirstTimeHomeBuyers from "../Components/FirstTimeHomeBuyers";
import FirstTimeHomeBuyersTypes from "../Components/FirstTimeHomeBuyersTypes";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import Footer from "../Components/Footer";

const FirstTimeHomeBuyersPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("firsttimehomebuyers").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FirstTimeHomeBuyers content={content?.hero} />
      <FirstTimeHomeBuyersTypes content={content?.types} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <Footer />
    </div>
  );
}

export default FirstTimeHomeBuyersPage
