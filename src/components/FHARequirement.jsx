import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultItems = [
  { title: "Minimum Down Payment:", description: "As low as 3.5% of the purchase price.", benefit: "Lower Down Payment: The 3.5% minimum down payment is much lower than many conventional options." },
  { title: "Credit Score:", description: "A FICO score of 580 or higher typically qualifies for the 3.5% down payment.", benefit: "Flexible Credit: FHA loans are more forgiving of past credit issues compared to conventional loans." },
  { title: "Debt-to-Income Ratio (DTI):", description: "Generally requires a DTI ratio of 43% or less.", benefit: "Lower Deposit: FHA loans generally require a lesser deposit than a conventional loan." },
  { title: "Residency:", description: "The home must be the borrower's primary residence.", benefit: "Keep Costs Low: FHA loans are effective at helping keep that upfront cash required low when purchasing a home." },
  { title: "Income Stability:", description: "Borrower must have steady income and proof of employment.", benefit: "MIP: FHA loans require a MIP, which includes both an upfront premium (paid at closing or financed) and an annual premium that breaks down into monthly payments that allows for the low down payment and flexible requirements." },
];

const defaultRequirement = { heading: "Requirements", items: defaultItems };

const FHARequirement = ({ content }) => {
  const r = mergeWithDefaults(defaultRequirement, content);
  const requirements = Array.isArray(r.items) && r.items.length > 0 ? r.items : defaultItems;

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Outer Border with Gradient */}
        <div className="relative bg-gradient-to-br from-[#1a4d6d] via-[#2a5f7f] to-[#1a4d6d] p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl">
          {/* Inner White Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Table Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                  {r.heading}
                </h2>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                  Description
                </h2>
              </div>
            </div>

            {/* Table Content */}
            <div className="space-y-6 sm:space-y-8">
              {requirements.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 pb-6 sm:pb-8 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  {/* Left - Requirement */}
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right - Benefit/Description */}
                  <div>
                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FHARequirement;

