import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import FHANoCreditScore from "../Components/FHANoCreditScore";
import FHANoCreditScoreOverview from "../Components/FHANoCreditScoreOverview";
import FHANoCreditScoreReferences from "../Components/FHANoCreditScoreReferences";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const FHANoCreditScorePage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fha-no-credit").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FHANoCreditScore content={content?.hero} />
      <FHANoCreditScoreOverview content={content?.overview} />
      <FHANoCreditScoreReferences content={content?.references} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default FHANoCreditScorePage

