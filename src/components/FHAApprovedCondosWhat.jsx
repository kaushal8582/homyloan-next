import React from "react";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhatIs = {
  heading: "What Is An FHA Approved Condo Loan?",
  description: "A lot of FHA-insured mortgages can't be purchased using a FHA-insured loan. The loans you must meet the standard FHA requirements (low down payment, low credit score, etc.) and that the condo association must meet specific terms to be eligible for FHA financing.\n\nIn today's market, with rising home prices, FHA-approved condos offer a smart option. They often require a lower deposit than renting and with FHA's low down payment requirement.",
  imageUrl: "/FHAApprove.svg",
};

const FHAApprovedCondosWhat = ({ content }) => {
  const data = mergeWithDefaults(defaultWhatIs, content);
  const paragraphs = (data.description || "").split("\n\n").filter(Boolean);
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {data.heading}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "mt-4 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed" : "mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed"}>
              {p}
            </p>
          ))}
        </div>
        {data.imageUrl && (
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img src={data.imageUrl} alt={data.heading} className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FHAApprovedCondosWhat;

