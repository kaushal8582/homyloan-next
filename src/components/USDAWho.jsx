import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultBorrowerItems = [
  "Income ≤115% of area median income",
  "Credit score typically 640+",
  "Stable, dependable income",
  "U.S. citizen or permanent resident",
];

const defaultPropertyItems = [
  { label: "Location:", body: "The property must be located in a qualified rural area as defined by the USDA mapping tool." },
  { label: "Primary Residence:", body: "The property must serve as the buyer's primary residence." },
];

const defaultWho = {
  heading: "Who is Eligible for a USDA Loan?",
  body: "USDA Rural Housing loans are available to qualified low to moderate income homebuyers purchasing a home in a designated rural area. Unlike other government loans, USDA loans have two main areas of qualification: borrower eligibility and property eligibility.",
  borrowerItems: defaultBorrowerItems,
  propertyItems: defaultPropertyItems,
};

const USDAWho = ({ content }) => {
  const data = mergeWithDefaults(defaultWho, content);
  const borrowerItems = Array.isArray(data.borrowerItems) && data.borrowerItems.length > 0 ? data.borrowerItems : defaultBorrowerItems;
  const propertyItems = Array.isArray(data.propertyItems) && data.propertyItems.length > 0 ? data.propertyItems : defaultPropertyItems;
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-8 md:px-14 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-3 sm:mb-4 uppercase px-2 sm:px-4 lg:px-8">
          {data.heading}
        </h2>
        {data.body && (
          <p className="text-xs sm:text-sm text-black/70 max-w-full sm:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-14 px-2 sm:px-0">
            {data.body}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-1 max-w-2xl mx-auto">
          <div className="bg-black text-white w-full sm:w-[90%] md:w-[300px] min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 text-left mx-auto">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 lg:mb-6">Borrower Requirements</h3>
            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-white/90">
              {borrowerItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#E6FF4B] w-full sm:w-[90%] md:w-[300px] min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 text-left mx-auto">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 lg:mb-6">Property Requirements</h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black/80">
              {propertyItems.map((item, i) => (
                <div key={i}>
                  <span className="font-semibold">{item.label}</span>
                  <p className="font-normal mt-2 sm:mt-3">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USDAWho;
