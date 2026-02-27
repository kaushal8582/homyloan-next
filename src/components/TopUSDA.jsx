import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultTop = {
  heading: "Top USDA Loan Benefits",
  description: "USDA loans stand out in the mortgage market by providing significant advantages, especially related to the down payment.",
  items: [
    "Zero down payment with 100% financing",
    "Option to finance eligible closing costs",
    "Flexible qualifying criteria",
    "Seller can cover up to 6% of costs",
    "Gift funds allowed",
    "Available for purchase or refinance",
  ],
};

const TopUSDA = ({ content }) => {
  const data = mergeWithDefaults(defaultTop, content);
  const items = Array.isArray(data.items) ? data.items : defaultTop.items;
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black leading-tight">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm text-black/70 leading-relaxed">
              {data.description}
            </p>
          )}
          {items.length > 0 && (
            <ul className="mt-4 sm:mt-5 lg:mt-6 space-y-2 sm:space-y-3 lg:space-y-4 text-xs sm:text-sm text-black/70 leading-relaxed list-disc pl-5 text-left">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Image */}
        <div className="w-full">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={data.imageUrl || "/USDAWho.svg"}
              alt="VA Loan Eligibility"
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopUSDA
