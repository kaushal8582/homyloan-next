import React from "react";
import Link from "next/link";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultTypes = {
  heading: "Types Of Assistance Available",
  description: "Down Payment Assistance comes in various forms, each designed to meet different financial needs. Our loan officers will help you determine which type you qualify for.",
  cards: [
    { title: "FHA LOAN", description: "OFFERS LOWER DOWN PAYMENT OPTIONS, MAKING IT IDEAL FOR FIRST-TIME BUYERS. LEARN MORE ABOUT FHA LOANS HERE.", href: "/fha-loan" },
    { title: "CONVENTIONAL LOAN", description: "FLEXIBLE DOWN PAYMENT OPTIONS WITH NO REQUIRED MORTGAGE INSURANCE. LEARN MORE ABOUT CONVENTIONAL LOANS HERE.", href: "/conventional-loan" },
    { title: "VA LOAN", description: "DESIGNED FOR VETERANS, OFFERING HOME LOANS WITH LIMITED CLOSING COSTS USING YOUR VA BENEFITS. LEARN MORE ABOUT VA LOANS HERE.", href: "/va-loan" },
  ],
};

const FirstTimeHomeBuyersTypes = ({ content }) => {
  const data = mergeWithDefaults(defaultTypes, content);
  const loanTypes = Array.isArray(data.cards) && data.cards.length > 0 ? data.cards : defaultTypes.cards;
  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase leading-tight">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {loanTypes.map((loan, index) => (
            <div key={index} className="bg-white rounded-3xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black uppercase mb-4">
                  {loan.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed">
                  {loan.description}
                </p>
              </div>
              <Link href={loan.href || "#"} className="mt-6 sm:mt-8 inline-block bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-black/90 transition-colors flex items-center gap-2 w-fit">
                Explore More
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstTimeHomeBuyersTypes;
