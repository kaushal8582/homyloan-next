import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultAssistanceTypes = [
  { type: "Statement History", description: "12- or 24-month Personal and Business Bank Statements allowed.", keyFeature: "24-Month Personal and Business Bank Statements required." },
  { type: "Loan-to-Value (LTV)", description: "LTV up to 85% with No Mortgage Insurance (MI).", keyFeature: "LTV up to 85% with No Mortgage Insurance (MI)." },
  { type: "Loan Amounts", description: "Loans up to $3 Million.", keyFeature: "Loans up to $3 Million." },
  { type: "Debt-to-Income (DTI)", description: "DTI up to 50%.", keyFeature: "DTI up to 43%." },
  { type: "Credit Score", description: "Credit Scores as low as 620.", keyFeature: "Credit Scores as low as 620." },
  { type: "Rate Term", description: "30-Year Fixed with 10-Year Interest-Only Option available.", keyFeature: "30-Year Fixed with 10-Year Interest-Only Option available." },
  { type: "Property Types", description: "Primary, Second, and Investment Homes.", keyFeature: "Primary, Second, and Investment Homes." },
];

const defaultTypes = {
  heading: "Types Of Assistance Available",
  description: "Down Payment Assistance comes in various forms, each designed to meet different financial needs. Our loan officers will help you determine which type you qualify for.",
  assistanceTypes: defaultAssistanceTypes,
};

const SelfEmployedTypes = ({ content }) => {
  const data = mergeWithDefaults(defaultTypes, content);
  const assistanceTypes = Array.isArray(data.assistanceTypes) && data.assistanceTypes.length > 0 ? data.assistanceTypes : defaultAssistanceTypes;

  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase tracking-wide">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* White Card with Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-x-auto">
          {/* Table */}
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-6 border-b-2 border-gray-300 mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black">
                  Assistance Type
                </h3>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black">
                  Description
                </h3>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black">
                  Key Feature
                </h3>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4 sm:space-y-6">
              {assistanceTypes.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-black">
                      {item.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                      {item.keyFeature}
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

export default SelfEmployedTypes;
