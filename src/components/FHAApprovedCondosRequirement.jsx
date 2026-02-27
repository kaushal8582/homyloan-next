import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultKeyBenefitsItems = [
  { title: "Investor/Rental Ratio:", description: "No more than 50% of the units can be investor-owned or used as rentals. The buyer must intend to occupy the unit as their primary residence." },
  { title: "Commercial Space:", description: "No more than 35% of the property can be used as commercial space." },
  { title: "Delinquencies:", description: "No more than 15% of units can be delinquent in their Homeowners Association (HOA) assessments for more than 60 days." },
  { title: "FHA Concentration:", description: "No more than 50% concentration of FHA Loans is allowed within the community." },
  { title: "Completion:", description: "The condo property or project must be fully completed (no projects still under construction will qualify)." },
  { title: "Reserves and Insurance:", description: "The property must be insured, and the condo association must keep at least 10% of the HOA budget in a cash reserve." },
];

const defaultRequirement = {
  heading: "Requirements (Project Eligibility)",
  body: "The most important step is ensuring the entire condo project or the specific unit meets FHA's strict guidelines.",
  keyBenefitsItems: defaultKeyBenefitsItems,
  spotApprovalHeading: "Single-Unit (Spot) Approval",
  spotApprovalBody: "Under current rules, individual condo units can sometimes be eligible for FHA loans even if the full development isn't officially FHA-approved. This is known as spot approval.",
  gettingApprovedHeading: "Getting Your Condo FHA-Approved",
  gettingApprovedBody: "Condos seeking to accept FHA buyers must go through an approval process (HUD Review and Approval Process - HRAP, or Direct Endorsement Lender Review and Approval Process - DELRAP) and must be recertified every three years to remain eligible.",
};

const FHAApprovedCondosRequirement = ({ content }) => {
  const data = mergeWithDefaults(defaultRequirement, content);
  const keyBenefitsItems = Array.isArray(data.keyBenefitsItems) && data.keyBenefitsItems.length > 0 ? data.keyBenefitsItems : defaultKeyBenefitsItems;
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {data.heading}
          </h2>
          {data.body && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed">
              {data.body}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          <div className="bg-black text-white rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Key Benefits</h3>
            <div className="space-y-5 sm:space-y-6">
              {keyBenefitsItems.map((item, i) => (
                <div key={i}>
                  <h4 className="text-sm sm:text-base font-semibold mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 h-full">
            <div className="bg-[#E6FF4B] text-black rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-start">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">{data.spotApprovalHeading}</h3>
              <p className="text-xs sm:text-sm md:text-base text-black/80 leading-relaxed">{data.spotApprovalBody}</p>
            </div>
            <div className="bg-[#F6F6F6] text-black rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-start">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">{data.gettingApprovedHeading}</h3>
              <p className="text-xs sm:text-sm md:text-base text-black/80 leading-relaxed">{data.gettingApprovedBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FHAApprovedCondosRequirement;

