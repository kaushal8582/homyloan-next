"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultReferences = {
  heading: "Sufficient Non-Traditional Credit References",
  body: "We understand that every financial situation is unique. That's why we accept a wide range of non-traditional credit references to help you qualify for a mortgage, including:",
  items: [
    "Rent or rent-to-own history",
    "Utility and phone bills",
    "Insurance and medical payments",
    "School tuition and childcare payments",
    "Car leases and personal loans",
    "Authorized user account history",
    "12 months of regular savings deposits",
    "Retail store credit card usage",
  ],
  ctaLabel: "Get a Quote",
};

const FHANoCreditScoreReferences = ({ content }) => {
  const router = useRouter();
  const data = mergeWithDefaults(defaultReferences, content);
  const items = Array.isArray(data.items) ? data.items : defaultReferences.items;
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        <div className="rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
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
          <img src="/sufficent.svg" alt="Non-Traditional Credit References" className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover" />
        </div>
      </div>
    </section>
  );
};

export default FHANoCreditScoreReferences;

