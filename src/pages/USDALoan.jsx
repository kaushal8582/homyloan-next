import React, { useState, useEffect } from "react";
import { getPageContent } from "../services/pageContentApi";
import Navbar from "../Components/Navbar";
import USDALoans from "../Components/USDALoans";
import USDAWhat from "../Components/USDAWhat";
import TopUSDA from "../Components/TopUSDA.jsx";
import USDAWho from "../Components/USDAWho";
import Chatbot from "../Components/Chatbot";
import FAQSection from "../Components/Frequentlyaskedquestions";
import SubscribeSection from "../Components/SubscribeSection";
import Footer from "../Components/Footer";

const USDALoan = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("usdaloan").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <USDALoans content={content?.hero} />
      <USDAWhat content={content?.what} />
      <TopUSDA content={content?.top} />
      <USDAWho content={content?.who} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default USDALoan;
