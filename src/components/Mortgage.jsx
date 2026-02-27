"use client";

import React from "react";
import { useRouter } from "next/navigation";
import familyImg from "../assets/familyImg.jpg";

const DEFAULT_CARDS = [
  { title: "Buy a Home", iconSrc: "/Mortage5.svg", route: "/purchase", description: "Find the right mortgage options to purchase your new home.", style: { borderTopRightRadius: "30px", borderBottomLeftRadius: "30px", borderTopLeftRadius: "60px", borderBottomRightRadius: "60px" } },
  { title: "Save Money", iconSrc: "/Mortage5.svg", description: "Explore refinancing solutions designed to lower rates and payments.", style: { borderTopRightRadius: "50px" }, route: "/refinance" },
  { title: "Use My VA Benefits", iconSrc: "/Mortage4.svg", description: "Specialized mortgage benefits for veterans and service members.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "70px" }, route: "/va-loan" },
  { title: "Remodel", iconSrc: "/Mortage3.svg", description: "Finance home improvements and renovations with ease.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "90px" }, route: "/renovation-loans" },
  { title: "Buy Big", iconSrc: "/Mortage2.svg", description: "Jumbo loan solutions for higher value properties.", style: { borderTopRightRadius: "80px", borderBottomLeftRadius: "60px" }, route: "/jumbo-loans" },
  { title: "Rural Housing", iconSrc: "/Mortage1.svg", description: "Affordable options for rural and suburban housing.", style: { borderTopRightRadius: "50px", borderBottomLeftRadius: "40px" }, route: "/usda" },
];

const Mortgage = ({ content }) => {
  const heading = content?.heading ?? "Mortgage Made Simple";
  const subtitle = content?.subtitle ?? "Find the perfect loan program for your unique financial situation. We make the process transparent and fast.";
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;
  const router = useRouter();

  // Unified navigation function (ensure route is a string for Next.js)
  const handleNavigation = (route) => {
    const href = typeof route === "string" ? route : route?.path ?? route?.url ?? "/";
    if (href && href !== "#") router.push(href);
  };

  return (
    <section className="w-full bg-black text-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Heading Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {heading}
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70 max-w-3xl mx-auto px-2 sm:px-0">
          {subtitle}
        </p>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20 max-w-6xl mx-auto">
        
        {/* MOBILE & TABLET LAYOUT (lg:hidden) */}
        <div className="lg:hidden px-2 sm:px-4 md:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 place-items-center w-full">
            {cards.map((card, index) => (
              <div
                key={card.route || index}
                onClick={() => handleNavigation(card.route)}
                style={card.style || {}}
                className="group relative w-full max-w-[140px] h-[140px] sm:max-w-[150px] sm:h-[150px] md:max-w-[160px] md:h-[160px] rounded-[50px] md:rounded-[55px] bg-white text-black transition-all duration-700 ease-out hover:scale-110 overflow-hidden cursor-pointer hover:z-10"
              >
                {/* Default Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                  <img src={card.iconSrc} alt={card.title} className="w-5 h-5 sm:w-6 object-contain" />
                  <p className="text-xs sm:text-sm font-medium text-center px-3">{card.title}</p>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <img src={familyImg} alt="Family" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#E6FF4BCC]"></div>
                  <div className="relative z-10">
                    <h3 className="font-semibold text-xs sm:text-sm">{card.title}</h3>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-black/80 leading-tight">{card.description}</p>
                  </div>
                  <button className="relative z-10 ml-auto bg-black text-white px-2.5 py-1 rounded-full text-[10px]">Explore →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP LAYOUT (hidden lg:block) */}
        <div className="hidden lg:block space-y-20">
          
          {/* Top Row (Cards 1-3) */}
          <div className="flex justify-start px-20">
            <div className="grid grid-cols-3 gap-12 xl:gap-48 place-items-center">
              {cards.slice(0, 3).map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(card.route)}
                  style={card.style || {}}
                  className="group relative w-[160px] h-[160px] rounded-[60px] bg-white text-black transition-all duration-700 ease-out hover:scale-150 hover:rounded-[65px] overflow-hidden cursor-pointer hover:z-10"
                >
                  {/* Default State */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 group-hover:opacity-0">
                    <img src={card.iconSrc} alt={card.title} className="w-6 h-6 object-contain" />
                    <p className="text-sm font-medium text-center px-4">{card.title}</p>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <img src={familyImg} alt="Family" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#E6FF4BCC]"></div>
                    <div className="relative z-10">
                      <h3 className="font-semibold text-base">{card.title}</h3>
                      <p className="mt-2 text-[9px] text-black/90 leading-tight">{card.description}</p>
                    </div>
                    <button className="relative z-10 ml-auto bg-black text-white px-3 py-1.5 rounded-full text-xs">Explore →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row (Cards 4-6) */}
          <div className="flex justify-end px-20">
            <div className="grid grid-cols-3 gap-12 xl:gap-48 place-items-center">
              {cards.slice(3, 6).map((card, index) => (
                <div
                  key={index + 3}
                  onClick={() => handleNavigation(card.route)}
                  style={card.style || {}}
                  className="group relative w-[160px] h-[160px] rounded-[60px] bg-white text-black transition-all duration-700 ease-out hover:scale-150 hover:rounded-[65px] overflow-hidden cursor-pointer hover:z-10"
                >
                  {/* Default State */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 group-hover:opacity-0">
                    <img src={card.iconSrc} alt={card.title} className="w-6 h-6 object-contain" />
                    <p className="text-sm font-medium text-center px-4">{card.title}</p>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <img src={familyImg} alt="Family" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#E6FF4BCC]"></div>
                    <div className="relative z-10">
                      <h3 className="font-semibold text-base">{card.title}</h3>
                      <p className="mt-2 text-[9px] text-black/90 leading-tight">{card.description}</p>
                    </div>
                    <button className="relative z-10 ml-auto bg-black text-white px-3 py-1.5 rounded-full text-xs">Explore →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Mortgage;