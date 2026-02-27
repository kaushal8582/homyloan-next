"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultWhat = {
  heading: "What is USDA Loan?",
  description: "USDA loans are guaranteed by the U.S. Department of Agriculture as part of its Rural Development Guaranteed Housing Loan program. These mortgages are designed for properties located in designated rural areas and offer excellent benefits to qualified low to moderate income homebuyers.",
  imageUrl: "/USDAWhat.svg",
  ctaLabel: "Get a Quote",
};

const WhatIsUSDA = ({ content }) => {
  const router = useRouter();
  const data = mergeWithDefaults(defaultWhat, content);
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-8 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
          <div className="w-full lg:max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 uppercase">
              {data.heading}
            </h2>
            {data.description && (
              <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                {data.description}
              </p>
            )}
          </div>
          <div className="flex justify-center lg:justify-start w-full lg:w-auto lg:flex-shrink-0">
            <Button onClick={() => router.push("/applynow")} label={data.ctaLabel || "Get a Quote"} />
          </div>
        </div>
        {data.imageUrl && (
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img src={data.imageUrl} alt={data.heading} className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIsUSDA;
