import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import PortfolioLending from "../Components/PortfolioLending";
import PortfolioLendingWhat from "../Components/PortfolioLendingWhat";
import PortfolioLendingInfo from "../Components/PortfolioLendingInfo";
import PortfolioFixFlip from "../Components/PortfolioFixFlip";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const PortfolioLendingPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("portfolio-lending").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <PortfolioLending content={content?.hero} />
      <PortfolioLendingWhat content={content?.whatIs} />
      <PortfolioLendingInfo content={content?.info} />
      <PortfolioFixFlip content={content?.fixFlip} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default PortfolioLendingPage

