"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWho = {
  heading: "Who Should Apply?",
  description:
    "Our Jumbo Loan programs are ideal for buyers of premium properties who demonstrate strong financial health. If you are looking to buy a high valued home, this loan may be right for you.",
  ctaLabel: "Get a Quote",
  bullets: ["A lower debt to income ratio", "A higher credit score", "A larger down payment"],
};

export default function Jumbo_Who({ content }) {
  const router = useRouter();
  const who = mergeWithDefaults(defaultWho, content?.who);
  const bullets = (who.bullets && who.bullets.length > 0) ? who.bullets : defaultWho.bullets;

  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-10 sm:gap-12 lg:gap-16">
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[55px] font-medium leading-[110%] lg:leading-[100%] uppercase text-[#101011] mt-0 sm:mt-4 lg:mt-8">
            {who.heading}
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-[17px] font-normal leading-[140%] text-[#101011B2] max-w-[600px] mx-auto lg:mx-0">
            {who.description}
          </p>

          <div className="mt-6 sm:mt-7 lg:mt-8 space-y-4 sm:space-y-5">
            {bullets.map((text, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 justify-center lg:justify-start">
                <img src="/star.svg" className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0" alt="" />
                <p className="text-sm sm:text-base lg:text-[18px] font-medium leading-[120%] lg:leading-[100%] text-[#101011] text-left">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-9 lg:mt-10 flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={who.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden max-w-md sm:max-w-lg mx-auto lg:mx-0">
            <img
              src="/VA_Who.svg"
              alt="Jumbo Loan Eligibility"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
