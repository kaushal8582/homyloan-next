"use client";

import React, { useEffect, useRef  } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
const DEFAULT_STATS = [
  { value: "300+", label: "Projects", bg: "bg-black", text: "text-white", size: "w-[160px] h-[160px]" },
  { value: "200+", label: "Clients", bg: "bg-gray-100", text: "text-black", size: "w-[140px] h-[140px]" },
  { value: "110%", label: "Commitment", bg: "bg-gray-100", text: "text-black", size: "w-[140px] h-[140px]" },
  { value: "100%", label: "Happy Clients", bg: "bg-[#E6FF4B]", text: "text-black", size: "w-[160px] h-[160px]" },
];

const HumanPoweredMortgage = ({ content }) => {
  const heading = content?.heading ?? "Human-Powered\nMortgage";
  const subtext = content?.subtext ?? "At Homy Loans, you work with one dedicated Loan Officer from start to finish.";
  const stats = content?.stats?.length ? content.stats : DEFAULT_STATS;
const router = useRouter();
  const orbitRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    // Group rotation
    const orbitTween = gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    // Counter-rotate bubbles so they stay upright
    const uprightTween = gsap.to(bubblesRef.current, {
      rotate: -360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    const el = orbitRef.current;

    const stop = () => {
      orbitTween.pause();
      uprightTween.pause();
    };

    const play = () => {
      orbitTween.resume();
      uprightTween.resume();
    };

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", play);

    return () => {
      orbitTween.kill();
      uprightTween.kill();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", play);
    };
  }, []);

  return (
    <section className="w-full bg-white py-12 md:py-24 px-6 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">
        {/* Left Content */}
        <div className="max-w-md">
          <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight whitespace-pre-line">
            {heading}
          </h2>

          <p className="mt-6 text-sm text-black/70 leading-relaxed">
            {subtext}
          </p>

          <p className="mt-4 text-sm text-black/70 leading-relaxed">
            We blend smart technology with personalized service available when
            it's most convenient for you.
          </p>

          <button
            onClick={() => {
              router.push("/goodhuman");
            }}
            className="mt-8 border border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Explore More →
          </button>
        </div>

        {/* Right Rotating Stats */}
        <div className="flex items-center justify-center w-full md:w-auto">
          <div
            ref={orbitRef}
            className="relative w-[320px] h-[280px] sm:w-[380px] sm:h-[340px] md:w-[420px] md:h-[360px]"
          >
            {/* Top Left */}
            <div className="absolute top-0 left-0">
              <StatBubble
                refEl={(el) => (bubblesRef.current[0] = el)}
                {...stats[0]}
              />
            </div>

            {/* Top Right */}
            <div className="absolute top-0 right-0">
              <StatBubble
                refEl={(el) => (bubblesRef.current[1] = el)}
                {...stats[1]}
              />
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0">
              <StatBubble
                refEl={(el) => (bubblesRef.current[2] = el)}
                {...stats[2]}
              />
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0">
              <StatBubble
                refEl={(el) => (bubblesRef.current[3] = el)}
                {...stats[3]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Bubble */
const StatBubble = ({ value, label, bg, text, size, refEl }) => (
  <div
    ref={refEl}
    className={`${size} ${bg} ${text} rounded-full flex flex-col items-center justify-center text-center shadow-sm`}
  >
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-xs opacity-80 mt-1">{label}</p>
  </div>
);

export default HumanPoweredMortgage;
