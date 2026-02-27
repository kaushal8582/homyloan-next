import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhatIs = {
  heading: "What Is An FHA Loan?",
  description: "An FHA Loan is a mortgage that is insured by the Federal Housing Administration, an agency within the U.S. Department of Housing and Urban Development (HUD). This insurance protects lenders against losses, allowing them to offer financing with less strict qualification criteria. FHA Loans allow borrowers to finance homes with down payments as low as 3.5%.",
  imageUrl: "/WhatWeOffer.svg",
};

const FHAWhat = ({ content }) => {
  const w = mergeWithDefaults(defaultWhatIs, content);
  const imgSrc = w.imageUrl?.trim() ? w.imageUrl : "/WhatWeOffer.svg";
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {w.heading}
          </h2>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
            {w.description}
          </p>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img src={imgSrc} alt="What Is An FHA Loan" className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FHAWhat;

