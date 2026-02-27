import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import ArriveHome from "../Components/ArriveHome";
import ArriveHomeOverview from "../Components/ArriveHomeOverview";
import ArriveHomeFactFiction from "../Components/ArriveHomeFactFiction";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import Footer from "../Components/Footer";

const ArriveHomePage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("arrive-home").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <ArriveHome content={content?.hero} />
      <ArriveHomeOverview content={content?.overview} />
      <ArriveHomeFactFiction content={content?.factFiction} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <FAQSection content={content?.faq} />
      <Footer />
    </div>
  );
}

export default ArriveHomePage

