import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import USDARenovation from "../Components/USDARenovation";
import USDARenovationOverview from "../Components/USDARenovationOverview";
import USDARenovationEligibility from "../Components/USDARenovationEligibility";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const USDARenovationPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("usda-renovation").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <USDARenovation content={content?.hero} />
      <USDARenovationOverview content={content?.overview} />
      <USDARenovationEligibility content={content?.eligibility} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default USDARenovationPage

