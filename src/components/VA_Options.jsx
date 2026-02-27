import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultOptions = {
  heading: "VA LOAN OPTIONS",
  description:
    "Whether you are looking to purchase a new home or refinance an existing mortgage, Homy Loans offers the full range of VA products to meet your financial needs.",
  cards: [
    { title: "Loan Type", items: ["VA Purchase Loan", "VA IRRRL (Streamline Refinance)", "VA Cash Out Loan"], highlight: false },
    { title: "Purpose", items: ["Buying a primary residence.", "Refinancing a current VA loan for a lower rate.", "Refinancing to take cash out of your home's equity."], highlight: true },
    { title: "Key Feature", items: ["Up to 100% financing (zero down payment).", "Fast, simple, with minimal or no out of pocket costs.", "Access home equity for debt or expenses."], highlight: false },
  ],
};

const VA_Options = ({ content }) => {
  const options = mergeWithDefaults(defaultOptions, content?.options);
  const cards = (options.cards && options.cards.length >= 3) ? options.cards.slice(0, 3) : defaultOptions.cards;

  return (
    <section className="w-full bg-black text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10 sm:mb-12 lg:mb-16 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase">
            {options.heading}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
            {options.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 ${idx === 1 ? "bg-[#E6FF4B] text-black" : "bg-white text-black"}`}
            >
              <h3 className="text-xs sm:text-sm font-bold mb-4 sm:mb-5 lg:mb-6 uppercase">{card.title}</h3>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                {(card.items || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <span className={idx === 1 ? "flex-shrink-0" : "text-[#E6FF4B] flex-shrink-0"}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VA_Options;
