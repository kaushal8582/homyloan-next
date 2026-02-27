"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';

const DEFAULT_CARDS = [
  {
    title: "Mortgage Loan Officers",
    iconSrc: "/RefinanceLogo1.svg",
    description: "Reduced Out of Pocket Costs",
    style: {borderTopRightRadius:"30px", borderBottomLeftRadius:"30px", borderTopLeftRadius:"60px", borderBottomRightRadius:"60px"},
    path: "/careers/mortgage-loan-officers",
  },
  {
    title: "Operations Support",
    iconSrc: "/RefinanceLogo1.svg",
    description:
      "Explore refinancing solutions designed to lower rates and payments.",
    style: {borderTopRightRadius:"50px", },
    path: "/careers/operations-support",
  },
  {
    title: "Branch Managers",
    iconSrc: "/RefinanceLogo1.svg",
    description: "lorem dduwchdw wdfedwgfvdewwdg dw",
    style: {borderTopRightRadius:"80px", borderBottomLeftRadius:"70px"},
    path: "/careers/branch-managers",
  },
  {
    title: "Marketing & Sales",
    iconSrc: "/RefinanceLogo1.svg",
    description: "Finance home improvements and renovations with ease.",
    style: {borderTopRightRadius:"80px", borderBottomLeftRadius:"90px"},
    path: "/careers/marketing-sales",
  },
];

const CareerOpportunities = ({ content }) => {
  const router = useRouter();
  const heading = content?.heading || "Career Opportunities at HomyLoans";
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;

  return (
    <section className="w-full bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight uppercase">
          {heading}
        </h1>
      </div>

      {/* Cards */}
      <div className="mt-12 sm:mt-16 lg:mt-20 max-w-6xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Top row – LEFT */}
        <div className="flex justify-center lg:justify-start px-2 sm:px-4 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-72 xl:gap-96 place-items-center">
            {cards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                onClick={() => { const p = card.path; router.push(typeof p === "string" ? p : p?.path ?? "/"); }}
                style={card.style}
                className="
                  group relative
                  w-36 h-36 sm:w-40 sm:h-40 lg:w-[160px] lg:h-[160px]
                  rounded-3xl sm:rounded-[40px] lg:rounded-[45px]
                  bg-white text-black
                  transition-all duration-700 ease-out
                  hover:scale-110 lg:hover:scale-150
                  hover:rounded-[35px] lg:hover:rounded-[32px]
                  overflow-hidden
                  cursor-pointer
                  hover:z-10
                "
              >
                {/* Default */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 group-hover:opacity-0">
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>

                {/* Hover */}
                <div
                  className="
                    absolute inset-0 p-4 sm:p-5
                    flex flex-col items-center justify-center
                    opacity-0 translate-y-3 scale-[0.95]
                    transition-all duration-500 ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-hover:scale-[1]
                    bg-[#E6FF4BCC]
                  "
                >
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row – RIGHT */}
        <div className="flex justify-center lg:justify-end px-2 sm:px-4 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-72 xl:gap-96 place-items-center">
            {cards.slice(2, 4).map((card, index) => (
              <div
                key={index + 2}
                onClick={() => { const p = card.path; router.push(typeof p === "string" ? p : p?.path ?? "/"); }}
                style={card.style}
                className="
                  group relative
                  w-36 h-36 sm:w-40 sm:h-40 lg:w-[160px] lg:h-[160px]
                  rounded-3xl sm:rounded-[40px] lg:rounded-[45px]
                  bg-white text-black
                  transition-all duration-700 ease-out
                  hover:scale-110 lg:hover:scale-150
                  hover:rounded-[35px] lg:hover:rounded-[32px]
                  overflow-hidden
                  cursor-pointer
                  hover:z-10
                "
              >
                {/* Default */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 group-hover:opacity-0">
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>

                {/* Hover */}
                <div
                  className="
                    absolute inset-0 p-4 sm:p-5
                    flex flex-col items-center justify-center
                    opacity-0 translate-y-3 scale-[0.95]
                    transition-all duration-500 ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-hover:scale-[1]
                    bg-[#E6FF4BCC]
                  "
                >
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerOpportunities
