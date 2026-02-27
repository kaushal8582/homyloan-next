"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultPmi = {
  heading: "Mortgage Insurance (PMI)",
  description: "If your down payment is less than 20%, you are generally required to pay Private Mortgage Insurance (PMI). However, with a Conventional Loan, PMI is temporary:",
  bodyText: "You can request to have PMI canceled once your loan-to-value (LTV) ratio reaches 80% (meaning you have 20% equity). Your lender is required to automatically cancel PMI once your LTV ratio reaches 78%.\n\nThis differs significantly from FHA loans, where mortgage insurance often lasts for the life of the loan.",
  ctaLabel: "Get a Quote",
  imageUrl: "/mortgage_insurance.svg",
};

const ConventionalPMI = ({ content }) => {
  const router = useRouter();
  const p = mergeWithDefaults(defaultPmi, content);
  const imgSrc = p.imageUrl?.trim() ? p.imageUrl : "/mortgage_insurance.svg";
  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16">
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight uppercase text-[#101011]">
            {p.heading}
          </h2>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#101011B2]">
            {p.description}
          </p>
          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#101011B2] whitespace-pre-line">
            {p.bodyText}
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={p.ctaLabel} bgColor="#E6FF4B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="w-full order-2">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden max-w-md sm:max-w-lg mx-auto lg:mx-0">
            <img src={imgSrc} alt="Mortgage Insurance (PMI)" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConventionalPMI;

