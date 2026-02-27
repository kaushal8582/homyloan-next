import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhatIs = {
  heading: "What Is A HELOC?",
  description: "A HELOC, or Home Equity Line of Credit, lets you borrow against your home's equity, often referred to as a second mortgage. With a HELOC from Homy Loans, you can borrow up to 95% of your home's equity and access a credit line of up to $500,000. It offers low rates and interest-only payments for the first 10 years, providing flexible funding for starting a business, paying off debt, or even purchasing a vacation home.",
};

const HELOCWhat = ({ content }) => {
  const data = mergeWithDefaults(defaultWhatIs, content);
  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HELOCWhat;

