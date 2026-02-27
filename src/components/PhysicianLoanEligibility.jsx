"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultEligibility = {
  heading: "Eligibility",
  items: [
    "Low down payment",
    "Loan amounts up to $850,000",
    "5/1 and 7/1 adjustable-rate mortgage options available",
    "Deferred student debt may be excluded from payment ratios¹",
    "Interested party contributions allowed",
  ],
  ctaLabel: "Get a Quote",
};

const PhysicianLoanEligibility = ({ content }) => {
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

            {items.length > 0 && (
              <div className="mb-6">
                <ul className="space-y-3 text-sm sm:text-base text-black/70 mb-6">
                  {items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-4">
                Eligible Borrowers
              </h3>
              <p className="text-sm sm:text-base text-black/70 mb-3">
                The Doctor Loan is available to medical professionals, including:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-black/70">
                <li>• Medical Residents (with educational license)</li>
                <li>• Medical Doctors (MD)</li>
                <li>• Doctors of Dental Science (DDS)</li>
                <li>• Doctors of Dental Medicine or Surgery (DMD)</li>
                <li>• Doctors of Optometry (OD)</li>
                <li>• Doctors of Ophthalmology (MD)</li>
                <li>• Doctors of Osteopathy (DO)</li>
                <li>• Doctors of Podiatric Medicine (DPM)</li>
              </ul>
            </div>

            <div className="mb-6">
              <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                Only the medically licensed borrower may qualify for deferment. Deferment must extend 12 months beyond closing. Available for purchase and rate/term refinance of primary residences only. Some restrictions apply; all borrowers are subject to credit approval. Program terms are subject to change, and underwriting conditions apply.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={data.ctaLabel || "Get a Quote"} bgColor="#E6FF4B" dotColor="#1a1a1a" />
          </div>
        </div>
        <div className="rounded-3xl sm:rounded-[30px] overflow-hidden">
          <img
            src={data.imageUrl || "/physician_eligibility.svg"}
            alt="Physician Loan Eligibility"
            className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PhysicianLoanEligibility;

