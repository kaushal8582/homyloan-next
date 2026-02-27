"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import RateCalculatorHero from "@/components/RateCalculator";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

function RateCalculator() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RateCalculatorHero />
      <AffordabilityCalculator/>
      <Footer/>
    </div>
  );
}

export default RateCalculator;
