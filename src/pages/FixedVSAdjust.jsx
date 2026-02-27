import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SubscribeSection from "../Components/SubscribeSection";
import FixedvsAdjust from "../Components/FixedvsAdjust";
import FixedRequirements from "../Components/FixedRequirements";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";

const FixedVSAdjust = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fixed-adjustable").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FixedvsAdjust content={content?.hero} />
      <FixedRequirements content={content?.requirements} />
      <Chatbot/>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default FixedVSAdjust;
