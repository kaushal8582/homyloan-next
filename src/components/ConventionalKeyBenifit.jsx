import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultKeyBenefit = {
  heading: "Key Requirements & Benefits",
  description: "Conventional loans typically require more from the borrower than government-backed loans, but they offer distinct advantages, especially once you build equity.",
  imageUrl: "/FHA.svg",
};

const ConventionalKeyBenifit = ({ content }) => {
  const k = mergeWithDefaults(defaultKeyBenefit, content);
  const imgSrc = k.imageUrl?.trim() ? k.imageUrl : "/FHA.svg";
  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16">
        <div className="w-full order-2 lg:order-1">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden max-w-md sm:max-w-lg mx-auto lg:mx-0 bg-[#F4F4F4] p-4 sm:p-6 lg:p-8">
            <img src={imgSrc} alt="Conventional Loan Key Requirements & Benefits" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight uppercase text-[#101011]">
            {k.heading}
          </h2>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#101011B2] max-w-[600px] mx-auto lg:mx-0">
            {k.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConventionalKeyBenifit;

