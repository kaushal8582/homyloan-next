"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Jumbo_Loans from "@/components/Jumbo_Loans";
import Jumbo_What from "@/components/Jumbo_What";
import Mortgage from "@/components/Mortgage";
import Jumbo_Who from "@/components/Jumbo_Who";
import JumboLoanSolution from "@/components/JumboLoanSolutions";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getPageContent } from "@/services/pageContentApi";

function JumboLoans() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("jumbo-loans").then(setContent);
  }, []);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <Jumbo_Loans content={content} />
      <Jumbo_What content={content} />
      <Mortgage content={content?.mortgage} />
      <Jumbo_Who content={content} />
      <JumboLoanSolution content={content} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default JumboLoans;