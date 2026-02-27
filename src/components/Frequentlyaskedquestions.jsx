"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const DEFAULT_FAQS = [
  { q: "What type of architecture does Arkitect specialize in?", a: "We believe in a human powered mortgage process. Our dedicated loan officers are good people committed to guiding you every step of the way, helping you achieve your homeownership goals." },
  { q: "Can Arkitect handle both architecture and interior design?", a: "Yes, Arkitect provides both architecture and interior design services." },
  { q: "Does Arkitect work on international projects?", a: "Yes, Arkitect works on both local and international projects." },
  { q: "What is Arkitect's design process?", a: "Arkitect follows a structured design process from concept to execution." },
  { q: "How do I start a project with Arkitect?", a: "You can start by contacting Arkitect through the official website." },
];

export default function FAQSection({ content }) {
  const [openIndex, setOpenIndex] = useState(0);
  const faqRefs = useRef([]);
  const contentRefs = useRef([]);
  const prevOpenIndexRef = useRef(0);
  const isInitialMount = useRef(true);
  const faqs = content?.faqs?.length ? content.faqs : DEFAULT_FAQS;

  // Smooth animation on open/close
  useEffect(() => {
    const prevIndex = prevOpenIndexRef.current;
    const currentIndex = openIndex;

    // Skip animation on initial mount - just set initial state
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevOpenIndexRef.current = currentIndex;
      return;
    }

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      faqs.forEach((_, index) => {
        const item = faqRefs.current[index];
        const content = contentRefs.current[index];
        
        if (!item) return;

        const isOpen = currentIndex === index;
        const wasOpen = prevIndex === index;

        if (isOpen && content && !wasOpen) {
          // Opening animation (only if it wasn't already open)
          gsap.killTweensOf([item, content]);
          
          // Get target height
          const closedHeight = window.innerWidth >= 1024 ? 65 : window.innerWidth >= 640 ? 55 : 50;
          gsap.set(item, { height: "auto" });
          const targetHeight = item.offsetHeight;
          gsap.set(item, { 
            height: closedHeight,
            opacity: 0,
            scale: 0.98,
          });
          
          // Animate height, opacity, and scale
          gsap.to(item, {
            height: targetHeight,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });

          // Animate content fade-in with slight delay
          gsap.fromTo(
            content,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        } else if (wasOpen && !isOpen && content) {
          // Closing animation
          gsap.killTweensOf([item, content]);
          
          const closedHeight = window.innerWidth >= 1024 ? 65 : window.innerWidth >= 640 ? 55 : 50;
          
          // Fade out content first
          gsap.to(content, {
            opacity: 0,
            y: -8,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
          
          // Then collapse height
          gsap.to(item, {
            height: closedHeight,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
            delay: 0.15,
            overwrite: "auto",
          });
        } else if (!isOpen) {
          // Ensure closed items maintain fixed height
          const closedHeight = window.innerWidth >= 1024 ? 65 : window.innerWidth >= 640 ? 55 : 50;
          gsap.set(item, {
            height: closedHeight,
            opacity: 1,
            scale: 1,
          });
        }
      });
    });

    prevOpenIndexRef.current = currentIndex;
  }, [openIndex]);

  return (
    <section className="w-full flex flex-col items-center bg-[#E7E7E7] mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 md:px-14 lg:px-20">
      {/* HEADING */}
      <h2 className="text-[clamp(24px,5vw,55px)] font-medium text-black leading-[110%] mt-12 sm:mt-16 lg:mt-20 text-center w-full max-w-4xl">
        Frequently Asked Questions
      </h2>

      {/* FAQ LIST */}
      <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-10 space-y-4 pb-12 sm:pb-16 lg:pb-20">
        {faqs.map((item, index) => (
          <div key={index}>
            {/* ========== OPEN (BLACK CARD) ========== */}
            {openIndex === index ? (
              <div
                ref={(el) => {
                  faqRefs.current[index] = el;
                }}
                className="relative bg-black rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-9 lg:pb-10 px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col sm:flex-row items-start justify-between gap-4 overflow-hidden"
              >
                {/* WHITE CURVE */}
                <div className="absolute -top-4 sm:-top-5 lg:-top-6 -left-2 sm:-left-2.5 lg:-left-3 w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 bg-white rounded-b-full"></div>

                {/* NEON CIRCLE */}
                <span className="absolute w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 top-1 left-6 sm:left-7 lg:left-8 rounded-full bg-black border-[2px] sm:border-[2.5px] lg:border-[3px] border-[#E6FF4B]"></span>

                {/* TEXT */}
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="w-full sm:max-w-[75%]"
                >
                  <h3 className="text-white text-[clamp(16px,3.5vw,25px)] font-semibold">
                    {item.q}
                  </h3>
                  <p className="text-white text-[clamp(13px,2.5vw,18px)] mt-2 sm:mt-3 leading-[140%]">
                    {item.a}
                  </p>
                </div>

                {/* ARROW (CLOSE) */}
                <button
                  onClick={() => setOpenIndex(null)}
                  className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full border-[2px] border-white flex-shrink-0 self-end sm:self-start transition-transform duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H9M17 7V15"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              /* ========== CLOSED (WHITE ROW) ========== */
              <div
                ref={(el) => {
                  faqRefs.current[index] = el;
                }}
                className="w-full h-[50px] sm:h-[55px] lg:h-[65px] bg-white border border-[#D4D4D4] rounded-[12px] sm:rounded-[13px] lg:rounded-[15px] flex items-center justify-between px-4 sm:px-5 lg:px-6 cursor-pointer transition-all duration-300 hover:shadow-md"
                onClick={() => setOpenIndex(index)}
              >
                <p className="text-[clamp(13px,2.8vw,20px)] font-medium text-[#101011] pr-4">
                  {item.q}
                </p>
                <span className="flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                  <img
                    src="/add-circle.svg"
                    alt="Plus"
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-transform duration-300"
                  />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
