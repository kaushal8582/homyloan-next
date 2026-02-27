"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultEligibility = {
  heading: "Eligibility",
  body: "The USDA Renovation Loan is subject to the standard eligibility requirements of the USDA Rural Development loan program, including:",
  items: [
    "The property must be located in a USDA-approved rural area.",
    "The borrower must meet low-to-moderate income limits for the area.",
    "The borrower typically needs a minimum credit score of 600 to qualify.",
  ],
  ctaLabel: "Get a Quote",
};

const USDARenovationEligibility = ({ content }) => {
  const router = useRouter();
  const data = mergeWithDefaults(defaultEligibility, content);
  const items = Array.isArray(data.items) ? data.items : defaultEligibility.items;
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        <div className="flex flex-col">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase leading-tight mb-6">
              {data.heading}
            </h2>
            {data.body && (
              <p className="text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed mb-6">
                {data.body}
              </p>
            )}
            {items.length > 0 && (
              <ul className="space-y-3 text-sm sm:text-base text-black/70 mb-8">
                {items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={data.ctaLabel || "Get a Quote"} bgColor="#E6FF4B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="rounded-3xl sm:rounded-[30px] overflow-hidden">
          <img src="/sufficent.svg" alt="USDA Renovation Eligibility" className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover" />
        </div>
      </div>
    </section>
  );
};

export default USDARenovationEligibility;

