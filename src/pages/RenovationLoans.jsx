"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Renovation_Loans from "@/components/Renovation_Loans";
import Renovation_what from "@/components/Renovation_What";
import Renovation_Homestyle from "@/components/Renovation_Homestyle";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

function RenovationLoans() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("renovation-loans").then(setContent);
  }, []);
  return (
    <div className="">
      <Navbar />
      <Renovation_Loans content={content} />
      <Renovation_what content={content} />
      <Renovation_Homestyle content={content} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default RenovationLoans;