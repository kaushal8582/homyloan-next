"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultProgramOptions = {
  subtext: "Our Loan options",
  heading: "Program Options",
  cards: [
    { title: "FHA Loans", iconSrc: "/RefinanceLogo1.svg", route: "/fha-loan", description: "Find the right mortgage options to purchase your new home.", style: { borderTopRightRadius: "30px", borderBottomLeftRadius: "30px", borderTopLeftRadius: "60px", borderBottomRightRadius: "60px" } },
    { title: "USDA Loans", iconSrc: "/RefinanceLogo1.svg", route: "/usdaloan", description: "Explore refinancing solutions designed to lower rates and payments.", style: { borderTopRightRadius: "50px" } },
    { title: "DPA Loans", iconSrc: "/Mortage3.svg", route: "/Downpaymentassistance", description: "Programs are available to help cover down payment.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "70px" } },
    { title: "VA Loans", iconSrc: "/Mortage2.svg", route: "/va-loan", description: "Finance home improvements and renovations with ease.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "90px" } },
    { title: "Conventional Loans", iconSrc: "/RefinanceLogo2.svg", route: "/conventional-loan", description: "Jumbo loan solutions for higher value properties.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "60px" } },
  ],
};

const CardComponent = ({ card, index, onNavigate }) => (
  <div
    key={index}
    style={card.style}
    onClick={() => onNavigate && onNavigate(card.route)}
    className="
      group relative
      w-36 h-36 sm:w-40 sm:h-40 lg:w-[160px] lg:h-[160px]
      rounded-3xl sm:rounded-[36px] lg:rounded-[38px]
      bg-white text-black
      transition-all duration-700 ease-out
      hover:scale-110 lg:hover:scale-150
      hover:rounded-[40px] lg:hover:rounded-[42px]
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
      style={card.style}
      className="
        absolute inset-0 p-4 sm:p-5
        flex flex-col justify-between
        opacity-0 translate-y-3 scale-[0.95]
        transition-all duration-500 ease-out
        group-hover:opacity-100
        group-hover:translate-y-0
        group-hover:scale-[1]
        bg-[#E6FF4BCC]
      "
    >
      <div>
        <h3 className="font-semibold text-sm sm:text-base">{card.title}</h3>
        <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-black/80 max-w-[180px]">
          {card.description}
        </p>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate(card.route); }} className="ml-auto bg-black text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs flex items-center gap-1.5 sm:gap-2">
        Explore →
      </button>
    </div>
  </div>
);

const ProgramOptions = ({ content }) => {
  const router = useRouter();
  const options = mergeWithDefaults(defaultProgramOptions, content);
  const cards = (options.cards && options.cards.length > 0)
    ? options.cards.map((c) => ({ ...c, iconSrc: c.iconSrc || c.image || "/RefinanceLogo1.svg", style: c.style || {} }))
    : defaultProgramOptions.cards;

  const handleNavigate = (route) => {
    if (!route) return;
    router.push(route);
  };

  return (
    <section className="w-full bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-2">
        <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-3xl mx-auto">
          {options.subtext}
        </p>
        <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">{options.heading}</h2>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20 max-w-7xl mx-auto">
        <div className="lg:hidden space-y-12 sm:space-y-16">
          <div className="flex justify-center px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 place-items-center">
              {cards.slice(0, 2).map((card, index) => (
                <CardComponent
                  key={index}
                  card={card}
                  index={index}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Row 2: 2 cards */}
          <div className="flex justify-center px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 place-items-center">
              {cards.slice(2, 4).map((card, index) => (
                <CardComponent
                  key={index + 2}
                  card={card}
                  index={index + 2}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Row 3: 1 card */}
          <div className="flex justify-center px-2 sm:px-4">
            <div className="grid grid-cols-1 place-items-center">
              {cards.slice(4, 5).map((card, index) => (
                <CardComponent
                  key={index + 4}
                  card={card}
                  index={index + 4}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout (3-2) - Shown on lg+ only */}
        <div className="hidden lg:block space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Row 1: 3 cards */}
          <div className="flex justify-center px-2 sm:px-4 lg:px-20">
            <div className="grid grid-cols-3 gap-48 xl:gap-60 place-items-center">
              {cards.slice(0, 3).map((card, index) => (
                <CardComponent
                  key={index}
                  card={card}
                  index={index}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Row 2: 2 cards */}
          <div className="flex justify-center px-2 sm:px-4 lg:px-20">
            <div className="grid grid-cols-2 gap-48 xl:gap-60 place-items-center">
              {cards.slice(3, 5).map((card, index) => (
                <CardComponent
                  key={index + 3}
                  card={card}
                  index={index + 3}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learn More */}
      <div className="mt-12 sm:mt-16 lg:mt-20 flex justify-center">
        <Button onClick={() => router.push("/purchase")} label="Learn More" bgColor="#FF6B6B" dotColor="#1a1a1a" />
      </div>
    </section>
  );
}

export default ProgramOptions
