import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhatIs = {
  heading: "What Is A Conventional Loan?",
  description: "A Conventional Loan is a mortgage that conforms to the loan limits and underwriting guidelines set by Fannie Mae and Freddie Mac. These are ideal for borrowers with strong credit and stable income, offering flexible terms for both home purchases and refinancing.\n\nConventional Loans are typically broken down into two main types:",
  conformingCard: { title: "Conforming Loans", description: "These adhere to the loan limits set by the FHFA, which are updated annually." },
  nonConformingCard: { title: "Non-Conforming Loans", description: "These are mortgages that exceed the Conforming Loan limits." },
};

const ConventionalWhat = ({ content }) => {
  const w = mergeWithDefaults(defaultWhatIs, content);
  const conforming = mergeWithDefaults(defaultWhatIs.conformingCard, w.conformingCard);
  const nonConforming = mergeWithDefaults(defaultWhatIs.nonConformingCard, w.nonConformingCard);
  return (
    <section className="w-full bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase leading-tight">
            {w.heading}
          </h2>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed whitespace-pre-line">
            {w.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-3xl mx-auto">
          {/* Conforming Loans Card */}
          <div className="bg-white text-black rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col items-start gap-3 mb-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <div className="absolute inset-0 bg-black rounded-xl"></div>
                <img
                  src="/Pig.svg"
                  alt={conforming.title}
                  className="relative w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                {conforming.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-black/70 leading-relaxed">
              {conforming.description}
            </p>
          </div>

          {/* Non-Conforming Loans Card */}
          <div className="bg-[#E6FF4B] text-black rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col items-start gap-3 mb-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <div className="absolute inset-0 bg-black rounded-xl"></div>
                <img
                  src="/Pig.svg"
                  alt={nonConforming.title}
                  className="relative w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                {nonConforming.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-black/70 leading-relaxed">
              {nonConforming.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConventionalWhat;

