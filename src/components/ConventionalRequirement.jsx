import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultItems = [
  { title: "Minimum Credit Score:", description: "Generally requires a minimum 620 FICO score.", benefit: "Seller Contributions: Sellers are allowed to contribute towards closing costs, helping reduce your out-of-pocket expenses." },
  { title: "Down Payment:", description: "Can be as low as 3% (for first-time homebuyers) or 5% for others.", benefit: "Property Types: Available for primary residences, second homes, and investment properties." },
  { title: "Source of Funds:", description: "Down payments can often be a gift from a relative.", benefit: "Cancelable Mortgage Insurance (MI): If your down payment is less than 20%, you'll need Private Mortgage Insurance (PMI), but you can typically request to cancel it once you reach 20% equity, lowering your monthly payment." },
];

const defaultRequirement = { heading: "Requirements", items: defaultItems };

const ConventionalRequirement = ({ content }) => {
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

export default ConventionalRequirement;

