"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VA from "@/components/VA";
import VA_Loan from "@/components/VA_Loan";
import VA_Who from "@/components/VA_Who";
import VA_Options from "@/components/VA_Options";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Frequentlyaskedquestion from "@/components/Frequentlyaskedquestions";
import { getPageContent } from "@/services/pageContentApi";

export default function VALoan() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("va-loan").then(setContent);
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <VA content={content} />
      <VA_Loan content={content} />
      <VA_Who content={content} />
      <VA_Options content={content} />
      <Chatbot />
      <Frequentlyaskedquestion content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}
