"use client";

import React from "react";
import { useRouter } from "next/navigation";

const DEFAULT_CARDS = [
  { title: "A Human Touch", image: "/why-1.svg", description: "lorem andfdwh dfhedbw edbwchd wevhd evfhdvd edvd " },
  { title: "Personalized Guidance", image: "/why-2.svg", description: "You get a dedicated loan officer who will work with you one on one." },
  { title: "Community Focused", image: "/why-3.svg", description: "lorem andfdwh dfhedbw edbwchd wevhd evfhdvd edvd " },
  { title: "Community Focused", image: "/why-4.svg", description: "lorem andfdwh dfhedbw edbwchd wevhd evfhdvd edvd " },
];

const WhyPeople = ({ content }) => {
  const router = useRouter();
  const heading = content?.heading ?? "Why People Choose Homy Loans";
  const description = content?.description ?? "We believe in a human powered mortgage process. Our dedicated loan officers are good people committed to guiding you every step of the way, helping you achieve your homeownership goals.";
  const buttonText = content?.buttonText ?? "Explore More →";
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;



  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-14 lg:px-20 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-black leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-gray-600 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
            {description}
          </p>
        </div>

        <button onClick={()=>{router.push("/aboutus")}} className=" cursor-pointer self-start border border-black rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 hover:bg-black hover:text-white transition">
          {buttonText}
        </button>
      </div>

      {/* Cards Section */}
      <div className="w-full flex justify-center">
        <div className="max-w-7xl w-full mt-8 md:mt-12">
          {/* Desktop: Expandable cards in a row */}
          <div className="hidden lg:flex justify-center gap-6 group">
            {cards.map((card, index) => (
              <div
                key={index}
                className="
    relative h-[420px] rounded-2xl overflow-hidden group/card
    transition-[flex-grow] duration-[900ms] ease-out
    flex-[1]
    group-hover:flex-[0.9]
    hover:flex-[1.5]
  "
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="
              absolute inset-0 w-full h-full object-cover
              transition-transform duration-900 ease-out
              group-hover:scale-105
            "
                />

                {/* Dark overlay */}
                <div
                  className="
    absolute inset-0 bg-black/45
    transition-opacity duration-900 ease-out
    group-hover/card:opacity-0
  "
                />

                {/* Collapsed title */}
                <div
                  className="
    absolute bottom-4 left-4 text-white font-medium text-lg
    transition-opacity duration-500 ease-out
    group-hover/card:opacity-0
  "
                >
                  {card.title}
                </div>

                {/* Hover expanded panel */}
                <div
                  className="
    absolute bottom-0 left-0 right-0 bg-[#E6FF4B] p-6 rounded-t-2xl
    transition-transform duration-900 ease-out
    translate-y-full group-hover/card:translate-y-0
  "
                >
                  <h3 className="text-xl font-semibold text-black">
                    {card.title}
                  </h3>

                  {card.description && (
                    <p
                      className="
        mt-3 text-base text-black/80 mr-5
        opacity-0 max-h-0 overflow-hidden
        transition-all duration-500 ease-out
        group-hover/card:opacity-100
        group-hover/card:max-h-32 pr-5
      "
                    >
                      {card.description}
                    </p>
                  )}

                  {/* Arrow */}
                   <div onClick={()=>{router.push("/goodhuman")}} className="  cursor-pointer absolute right-5 bottom-5 w-12 h-12 rounded-full border border-black flex items-center justify-center">
                    <img
                      src="/arrow-up-right.svg"
                      alt="Arrow"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet/Mobile: 2x2 Grid */}
          <div className="lg:hidden grid grid-cols-2 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative h-[280px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#E6FF4B] p-4 rounded-t-2xl h-[100px] sm:h-auto">
                  <h3 className="text-sm sm:text-base font-semibold text-black">
                    {card.title}
                  </h3>

                  {card.description && (
                    <p className="mt-2 text-xs sm:text-sm text-black/80 pr-10 line-clamp-2">
                      {card.description}
                    </p>
                  )}

                  {/* Arrow */}
                   <div onClick={()=>{router.push("/goodhuman")}} className=" cursor-pointer absolute right-3 bottom-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center">
                    <img
                      src="/arrow-up-right.svg"
                      alt="Arrow"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPeople;
