"use client";

import React, {act, useEffect, useMemo, useRef, useState} from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
const DEFAULT_OPTIONS = [
  { id: "conventional", title: "Conventional Loans", image: "/Home_1.svg", route: "/conventional-loan", description: "We believe in a human powered mortgage process. Our dedicated loan officers are good people committed to guiding you every step of the way, helping you achieve your homeownership goals." },
  { id: "fha", title: "FHA Loans", image: "/Home_2.svg", route: "/fha-loan", description: "FHA loans make homeownership more accessible with flexible credit and down payment options." },
  { id: "va", title: "VA Loans", image: "/Home_3.svg", route: "/va-loan", description: "VA loans offer exclusive benefits for veterans, including zero down payment options." },
  { id: "jumbo-1", title: "Jumbo Loans", image: "/Home_4.svg", route: "/jumbo-loans", description: "Jumbo loans are designed for high-value properties that exceed conventional limits." },
  { id: "jumbo-2", title: "Refinance", route: "/refinance2", image: "/physician.svg", description: "To refinance a mortgage means to replace an existing mortgage loan with a new one. With a refinance, the principal balance of the existing loan is paid-in-full using the balance of the new loan." },
];

const HomeFinancingOption = ({ content }) => {
  const options = content?.options?.length ? content.options : DEFAULT_OPTIONS;
  const [active, setActive] = useState(0);
  const cardRefs = useRef([]);
  const cardWrapperRefs = useRef([]);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const isDesktopHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const next = () => {
    setActive((prev) => (prev + 1) % options.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + options.length) % options.length);
  };

  // Active item always appears first (left-most)
  const visibleOptions = [
    options[active],
    ...options.slice(active + 1),
    ...options.slice(0, active),
  ];

  // Calculate original index from visible index
  const getOriginalIndex = (visibleIndex) => {
    return (active + visibleIndex) % options.length;
  };

  // Smooth animations for cards
  useEffect(() => {
    if (!isDesktopHover) return;

    const tl = gsap.timeline();

    visibleOptions.forEach((_, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      const isBig = idx === 0;
      const targetWidth = isBig ? 320 : 200;
      const targetHeight = isBig ? 260 : 180;

      // Animate size with stagger for smoother effect
      gsap.killTweensOf(cardEl);
      tl.to(
        cardEl,
        {
          width: targetWidth,
          height: targetHeight,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        },
        idx * 0.05
      );
    });
  }, [active, isDesktopHover, visibleOptions]);

  // Smooth content fade animation
  useEffect(() => {
    if (!contentRef.current) return;
    
    gsap.killTweensOf(contentRef.current);
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [active]);

  // Smooth container transition
  useEffect(() => {
    if (!containerRef.current || !isDesktopHover) return;
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0.95 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      }
    );
  }, [active, isDesktopHover]);


  const router = useRouter()

  return (
    <section className="w-full bg-gray-200 py-20 px-8 md:px-14 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h2
            className="
      text-2xl
      sm:text-3xl
      md:text-4xl
      lg:text-5xl
      font-semibold
      text-black
      leading-tight
      whitespace-nowrap
    "
          >
            Home Financing Options
          </h2>

          <div className="w-full sm:w-auto flex justify-end">
            <button
              className="
        bg-black text-white
        px-4 py-2
        sm:px-5 sm:py-2.5
        md:px-6 md:py-3
        rounded-full
        text-xs sm:text-sm md:text-base
        font-medium
        flex items-center gap-1.5 sm:gap-2
        whitespace-nowrap
        hover:bg-gray-800
        transition
      "
            >
              Explore More →
            </button>
          </div>
        </div>

        {/* Images block (fixed width, no reflow) */}
        <div className="w-full">
          <div
            ref={containerRef}
            className="flex items-start gap-6 overflow-hidden h-[260px]"
          >
            {visibleOptions.map((item, index) => {
              const isActive = index === 0;
              const originalIndex = getOriginalIndex(index);

              const handleMouseEnter = () => {
                if (!isDesktopHover || isAnimatingRef.current) return;
                // Only change active if it's different
                if (originalIndex !== active) {
                  isAnimatingRef.current = true;
                  setActive(originalIndex);
                  // Reset animation flag after animation completes
                  setTimeout(() => {
                    isAnimatingRef.current = false;
                  }, 650);
                }
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardWrapperRefs.current[index] = el;
                  }}
                  className="flex-shrink-0"
                  // onMouseEnter={handleMouseEnter}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`
      rounded-2xl overflow-hidden
      ${isDesktopHover ? "" : isActive ? "w-[320px] h-[260px]" : "w-[200px] h-[180px]"}
    `}
                    style={
                      isDesktopHover
                        ? {
                            width: isActive ? 320 : 200,
                            height: isActive ? 260 : 180,
                          }
                        : undefined
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title only for non-active images */}
                  {!isActive && (
                    <p className="mt-2 text-sm text-black text-center">
                      {item.title}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Arrows UNDER images */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={prev}
              className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/Left.svg"
                alt="Previous"
                className="w-15 h-15 object-contain transition drop-shadow-none hover:drop-shadow-[0_0_10px_rgba(230,255,75,0.9)]"
              />
            </button>

            <button
              onClick={next}
              className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/Right.svg"
                alt="Next"
                className="w-15 h-15 object-contain transition drop-shadow-none hover:drop-shadow-[0_0_10px_rgba(230,255,75,0.9)]"
              />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-black/30" />

        {/* Content */}
        <div className="flex items-start justify-between gap-10">
          <div ref={contentRef} className="max-w-3xl">
            <h3 className="text-xl font-semibold text-black">
              {options[active].title}
            </h3>
            <p className="mt-3 text-sm text-black/70">
              {options[active].description}
            </p>
          </div>

          <button
            onClick={() => {
              const r = options[active].route;
              router.push(typeof r === "string" ? r : r?.path ?? r?.url ?? "/");
            }}
            className="flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6FF4B]"
          >
            <img
              src="/Up_Right.svg"
              alt="Go"
              className="w-30 h-10 lg:w-10 object-contain transition drop-shadow-none hover:drop-shadow-[0_0_10px_rgba(230,255,75,0.9)]"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFinancingOption;
