"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultPrograms = {
  heading: "HELOC Programs to Fit Your Needs",
  subheading: "HELOC Benefits",
  items: [
    "Maximum Credit Line: Up to $500,000 for well-qualified borrowers",
    "Draw Period: 10 years",
    "Repayment Period: Interest-only payments during the 10-year draw period; principal and interest payments during the 20-year repayment period",
    "Floor Rate: 3.95%",
    "Rate Cap: 18%, with up to 2% annual increase or decrease",
    "Property Types: 1-4 Unit, Fee Simple, PUD, Condo, Townhouse",
  ],
  body: "At Homy Loans, we offer a variety of HELOC programs to fit your needs.",
  ctaLabel: "Get a Quote",
};

const HELOCPrograms = ({ content }) => {
  const router = useRouter();
  const data = mergeWithDefaults(defaultPrograms, content);
  const items = Array.isArray(data.items) ? data.items : defaultPrograms.items;
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase leading-tight mb-6">
              {data.heading}
            </h2>
            {data.subheading && (
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-4">
                {data.subheading}
              </h3>
            )}
            {items.length > 0 && (
              <ul className="space-y-3 text-sm sm:text-base text-black/70 mb-6">
                {items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            )}
            {data.body && (
              <p className="text-sm sm:text-base text-black/70 mb-8">
                {data.body}
              </p>
            )}
          </div>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={data.ctaLabel || "Get a Quote"} bgColor="#E6FF4B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="rounded-3xl sm:rounded-[30px] overflow-hidden">
          <img
            src={data.imageUrl || "/heloc.svg"}
            alt="HELOC Programs"
            className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HELOCPrograms;

