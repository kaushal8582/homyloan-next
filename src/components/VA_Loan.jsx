"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhatIs = {
  heading: "WHAT IS VA LOAN?",
  description:
    "A VA loan is a mortgage designed specifically for veterans and service members. It is provided by approved private lenders like Homy Loans and is guaranteed by the federal government (the Department of Veterans Affairs). The primary benefit of a VA loan is the ability to purchase a home with no money down for eligible service members and veterans who meet qualifying income and credit requirements.",
  ctaLabel: "Get a Quote",
};

const VA_Loan = ({ content }) => {
  const router = useRouter();
  const whatIs = mergeWithDefaults(defaultWhatIs, content?.whatIs);
  const descParagraphs = (whatIs.description || "").split("\n").filter(Boolean);
  if (descParagraphs.length === 0) descParagraphs.push(defaultWhatIs.description);

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-14 lg:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
          {whatIs.heading}
        </h2>
        {descParagraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed" : "mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed"}>
            {p}
          </p>
        ))}
        <div className="mt-8 sm:mt-9 lg:mt-10 flex justify-center">
          <Button onClick={() => router.push("/applynow")} label={whatIs.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
};

export default VA_Loan;
