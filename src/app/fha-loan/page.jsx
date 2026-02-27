"use client";

import { useState, useEffect } from "react";
import { getPageContent } from "@/services/pageContentApi";
import Navbar from "@/components/Navbar";
import FHALoan from "@/components/FHALoan";
import FHAWhat from "@/components/FHAWhat";
import FHAKeyBenifit from "@/components/FHAKeyBenifit";
import FHARequirement from "@/components/FHARequirement";
import Chatbot from "@/components/Chatbot";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

export default function FHALoanPage() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getPageContent("fha-loan").then(setContent);
  }, []);
  return (
    <div>
      <Navbar />
      <FHALoan content={content?.hero} />
      <FHAWhat content={content?.whatIs} />
      <FHAKeyBenifit content={content?.keyBenefit} />
      <FHARequirement content={content?.requirement} />
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <Chatbot />
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  )
}
