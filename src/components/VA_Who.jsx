"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWho = {
  heading: "WHO IS ELIGIBLE FOR A VA LOAN?",
  description:
    "To qualify for a VA Loan, a veteran must meet certain service requirements. Eligibility is typically open to: Veterans who have served a minimum number of days during wartime or peacetime. Service members who have served six years or more in the Reserves or National Guard. Active duty service members after serving for a minimum period. Spouses of a service member who was killed in the line of duty or died from a service-related disability.",
  ctaLabel: "Get a Quote",
};

const defaultListItems = [
  "Veterans who have served a minimum number of days during wartime or peacetime.",
  "Service members who have served six years or more in the Reserves or National Guard.",
  "Active duty service members after serving for a minimum period.",
  "Spouses of a service member who was killed in the line of duty or died from a service-related disability.",
];

const VA_Who = ({ content }) => {
  const router = useRouter();
  const who = mergeWithDefaults(defaultWho, content?.who);

  return (
    <section className="w-full bg-[#F4F4F4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight uppercase">
            {(who.heading || "").split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < (who.heading || "").split("\n").length - 1 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed">
            {who.description}
          </p>

          <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base text-black/70 leading-relaxed list-disc pl-5 text-left max-w-md mx-auto lg:mx-0">
            {defaultListItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start">
            <Button onClick={() => router.push("/applynow")} label={who.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-md sm:max-w-lg mx-auto lg:mx-0">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src="/VA_Who.svg"
              alt="VA Loan Eligibility"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VA_Who;
