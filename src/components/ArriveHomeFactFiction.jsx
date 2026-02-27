"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultFactFiction = {
  heading: "FACT VS. FICTION",
  repayableHeading: "Repayable DPA",
  repayableItems: ["No income limits", "3.5% or 5% assistance (5% assistance is only offered for repayable assistance)", "Amortized, 10-year term with a fixed interest rate 2% higher than first mortgage", "No subordination for 3 years", "Less out of pocket"],
  forgivableHeading: "Forgivable DPA",
  forgivableItems: ["Qualifying income must be less than or equal to 160% of median income", "3.5% assistance", "30-year term with a fixed 0% interest rate. No monthly payments", "No subordination", "Forgiven after 36 on-time 1st payments", "Lower total payment, more in closing costs"],
  ctaLabel: "Get a Quote",
};

const ArriveHomeFactFiction = ({ content }) => {
  const router = useRouter();
  const data = mergeWithDefaults(defaultFactFiction, content);
  const repayable = Array.isArray(data.repayableItems) ? data.repayableItems : defaultFactFiction.repayableItems;
  const forgivable = Array.isArray(data.forgivableItems) ? data.forgivableItems : defaultFactFiction.forgivableItems;
  return (
    <section className="w-full bg-[#F6F6F6] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-stretch">
        <div className="w-full lg:max-w-xl text-center lg:text-left flex flex-col">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black uppercase leading-tight whitespace-nowrap">
            {data.heading}
          </h2>
          <div className="mt-6 sm:mt-8 lg:mt-10">
            {data.repayableHeading && (
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-3 sm:mb-4">
                {data.repayableHeading}
              </h3>
            )}
            {repayable.length > 0 && (
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-black leading-relaxed list-disc pl-5 text-left">
                {repayable.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-10">
            {data.forgivableHeading && (
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-3 sm:mb-4">
                {data.forgivableHeading}
              </h3>
            )}
            {forgivable.length > 0 && (
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-black leading-relaxed list-disc pl-5 text-left">
                {forgivable.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={data.ctaLabel || "Get a Quote"} bgColor="#E6FF4B" dotColor="#1a1a1a" className="!w-auto sm:!w-[28vw] lg:!w-[22vw]" />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden h-full">
            <img src={data.imageUrl || "/factvsfiction.svg"} alt="Down Payment Assistance" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArriveHomeFactFiction;
