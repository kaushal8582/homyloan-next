"use client";

import { useEffect, useState } from "react";
import PurchaseCalculator from "./Calculator/PurchaseCalculator";
import AffordabilityCalc from "./Calculator/AffordabilityCalc.jsx";
import RefinanceCalculator from "./Calculator/RefinanceCalculator";
import RentVsBuyCalculator from "./Calculator/RentVsBuyCalculator";
import VaPurchaseCalculator from "./Calculator/VaPurchaseCalculator";
import VaRefinanceCalculator from "./Calculator/FHACalculator.jsx";

export default function AffordabilityCalculator() {
  const [activeTab, setActiveTab] = useState("Purchase");

  const tabs = [
    "Purchase",
    "Refinance",
    "Affordability",
    "Rent Vs Buy",
    "Va Loan",
    "FHA Loan",
  ];

  useEffect(() => {
    console.log("active tab", activeTab);
  }, [activeTab]);

  return (
    <section className="w-full  py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            Affordability Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Estimate your monthly mortgage payments and see how much house you
            can afford based on your income and expenses.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={` cursor-pointer px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#E6FF4B] text-black font-semibold"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Calculator Content */}
        <div className=" rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">
          {/* Render different calculator based on active tab */}
          {activeTab === "Purchase" && <PurchaseCalculator />}
          {activeTab === "Refinance" && <RefinanceCalculator />}
          {activeTab === "Affordability" && <AffordabilityCalc />}
          {activeTab === "Rent Vs Buy" && <RentVsBuyCalculator />}
          {activeTab === "Va Loan" && <VaPurchaseCalculator />}
          {activeTab === "FHA Loan" && <VaRefinanceCalculator />}
          {/* {activeTab === "Debt-Service (DSCR)" && <DSCRCalculator />} */}
          {/* {activeTab === "Fix & Flip" && <FixFlipCalculator />} */}
        </div>
      </div>
    </section>
  );
}
