"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import WhyPeople from "@/components/WhyPeople";
import Mortgage from "@/components/Mortgage";
import HomeFinancingOption from "@/components/HomeFinancingOption";
import GoodHuman from "@/components/GoodHuman";
import Client from "@/components/Client";
import HumanPoweredMortgage from "@/components/HumanPoweredMortgage";
import Frequentlyaskedquestions from "@/components/Frequentlyaskedquestions";
import Footer from "@/components/Footer";
import Logos from "@/components/Logos";
import { getHomePageContent } from "@/services/pageContentApi";

function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getHomePageContent().then(setContent);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="">
        <Navbar />
        <LandingPage content={content?.landing} />
      </div>
      <WhyPeople content={content?.whyPeople} />
      <Mortgage content={content?.mortgage} />
      <HomeFinancingOption content={content?.homeFinancingOption} />
      <GoodHuman content={content?.goodHuman} />
      <Logos />
      <Client content={content?.client} />
      <Frequentlyaskedquestions content={content?.faq} />
      <HumanPoweredMortgage content={content?.humanPoweredMortgage} />
      <Footer />
    </div>
  );
}

export default Home;
