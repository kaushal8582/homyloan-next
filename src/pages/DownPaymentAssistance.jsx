"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Downpaymentassistance from "@/components/Downpaymentassistance";
import DownPayemenWhat from "@/components/DownPayemenWhat";
import KeyBenefitDownPayment from "@/components/KeyBenefitDownPayment";
import TypesAssistance from "@/components/TypesAssistance";
import Chatbot from "@/components/Chatbot";
import Frequentlyaskedquestion from "@/components/Frequentlyaskedquestions";
import Footer from "@/components/Footer";
import SubscribeSection from "@/components/SubscribeSection";
import { getPageContent } from "@/services/pageContentApi";

const DownPaymentAssistance = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("Downpaymentassistance").then(setContent);
  }, []);
  return (
    <div className="">
      <div>
        <Navbar />
        <Downpaymentassistance content={content} />
      </div>
      <DownPayemenWhat content={content} />
      <KeyBenefitDownPayment content={content} />
      <TypesAssistance content={content} />
      <Chatbot />
      <Frequentlyaskedquestion />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default DownPaymentAssistance;
