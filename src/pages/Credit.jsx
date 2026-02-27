"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CreditChallenged from "@/components/CreditChallanged";
import MortgageForCredit from "@/components/MortgageForCredit";
import LoanProgram from "@/components/LoanProgram";
import CreditChallengedSteps from "@/components/CreditChallengedSteps";
import Chatbot from "@/components/Chatbot";
import Frequentlyaskedquestion from "@/components/Frequentlyaskedquestions";
import Footer from "@/components/Footer";
import SubscribeSection from "@/components/SubscribeSection";
import { getPageContent } from "@/services/pageContentApi";

const Credit = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("credit-challenged").then(setContent);
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <CreditChallenged content={content} />
      </div>
      <MortgageForCredit content={content} />
      <LoanProgram content={content} />
      <CreditChallengedSteps content={content} />
      <Chatbot />
      <Frequentlyaskedquestion />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Credit;
