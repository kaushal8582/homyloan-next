"use client";

import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import SelfEmployed from "../Components/SelfEmployed";
import SelfEmployedBankStatement from "../Components/SelfEmployedBankStatement";
import SelfEmployedTypes from "../Components/SelfEmployedTypes";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import Footer from "../Components/Footer";

const SelfEmployedPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("self-employed").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <SelfEmployed content={content?.hero} />
      <SelfEmployedBankStatement content={content?.bankStatement} />
      <SelfEmployedTypes content={content?.types} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <Footer />
    </div>
  );
}

export default SelfEmployedPage
