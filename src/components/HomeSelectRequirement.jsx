import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultLeftItems = [
  { title: "Interest Savings:", description: "Daily deposits reduce principal and interest" },
  { title: "Reduced Monthly Payments:", description: "Deposits act as payments; only short falls pay interest" },
  { title: "30-Year Equity Access:", description: "Functions like a long-term line of credit" },
  { title: "Flexible Loan Terms:", description: "No balloon payment or prepayment penalties" },
  { title: "Banking Features:", description: "Includes checking account perks like online bill-pay and debit access" },
  { title: "Property Eligibility:", description: "Valid for primary, secondary, and investment properties" },
];

const defaultRightItems = [
  { title: "Minimum FICO:", description: "700 (Primary/Second), 720 (Investment)" },
  { title: "Maximum LTV:", description: "90% for primary home purchase/refinance" },
  { title: "Maximum DTI:", description: "43%" },
  { title: "Reserves:", description: "Up to 18% of LOC required" },
  { title: "Rate Option:", description: "1-month adjustable, competitive with conventional loans" },
  { title: "Loan Amount:", description: "Up to $3M, no geographic limits" },
];

const defaultRequirement = { heading: "Requirements", guidelinesHeading: "Guidelines for Home Select", leftItems: defaultLeftItems, rightItems: defaultRightItems };

const HomeSelectRequirement = ({ content }) => {
  const r = mergeWithDefaults(defaultRequirement, content);
  const leftItems = Array.isArray(r.leftItems) && r.leftItems.length > 0 ? r.leftItems : defaultLeftItems;
  const rightItems = Array.isArray(r.rightItems) && r.rightItems.length > 0 ? r.rightItems : defaultRightItems;
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        <div className="bg-black text-white rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            {r.heading}
          </h3>

          <div className="space-y-4 sm:space-y-5">
            {leftItems.map((item, i) => (
              <div key={i}>
                <h4 className="text-sm sm:text-base font-semibold mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#E6FF4B] text-black rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            {r.guidelinesHeading}
          </h3>

          <div className="space-y-4 sm:space-y-5">
            {rightItems.map((item, i) => (
              <div key={i}>
                <h4 className="text-sm sm:text-base font-semibold mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSelectRequirement;

