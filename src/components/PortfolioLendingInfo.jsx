import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultInfo = {
  heading: "What Is VA Loan?",
  description: "Portfolio lending refers to loans a lender originates and keeps on its own books (in its \"portfolio\") rather than selling them to large government-backed agencies like Fannie Mae or Freddie Mac. This allows us to create custom loan products and underwriting guidelines to serve borrowers with unique needs, such as investors, renovators, and those requiring fast, creative financing.",
  imageUrl: "/Portfolio_Lending.svg",
};

const PortfolioLendingInfo = ({ content }) => {
  const i = mergeWithDefaults(defaultInfo, content);
  const imgSrc = i.imageUrl?.trim() ? i.imageUrl : "/Portfolio_Lending.svg";
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {i.heading}
          </h2>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
            {i.description}
          </p>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img src={imgSrc} alt="What Is Portfolio Lending" className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioLendingInfo;

