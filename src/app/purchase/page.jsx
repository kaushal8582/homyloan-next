"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PurchaseLoanHero from "@/components/PurchaseLoan";
import PurchaseLoanOption from "@/components/PurchaseLoanOption";
import PurchaseLoanAdvantage from "@/components/PurchaseLoanAdvantage";
import Chatbot from "@/components/Chatbot";
import FAQSection from "@/components/Frequentlyaskedquestions";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import { getPageContent } from "@/services/pageContentApi";

export default function Purchase() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPageContent("purchase").then(setContent);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <PurchaseLoanHero content={content?.hero} />
      <PurchaseLoanOption content={content?.loanOptions} />
      <PurchaseLoanAdvantage content={content?.advantage} />
      <Chatbot />
      <FAQSection content={content?.faq} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}
