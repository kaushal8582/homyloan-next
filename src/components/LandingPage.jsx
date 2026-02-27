"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin"; // Import TextPlugin
import Image from "next/image";
import Button from "../UI/Button";
import Logo from "../assets/logo.png";

const VIDEO_PATHS = [
  "/videos/Homy Loan.mp4",
  "/videos/Homy Loan (2).mp4",
  "/videos/Homy Loan (3).mp4",
  "/videos/Homy Loan (4).mp4",
  "/videos/Homy Loan (5).mp4",
  "/videos/Homy Loan (6).mp4",
];
import { useRouter } from "next/navigation";
// Register the plugin
gsap.registerPlugin(TextPlugin);

const DEFAULT_MAIN = "A Smarter Mortgage Experience";
const DEFAULT_ROTATING = [
  "Where Home Begins",
  "Helping Families Settle In.",
  "Financing Your Future.",
  "From Hope to Home.",
];
const LOCAL_VIDEOS = VIDEO_PATHS;

const LandingPage = ({ content }) => {
  const mainHeading = content?.mainHeading ?? DEFAULT_MAIN;
  const subHeading = content?.subHeading ?? "Starts here";
  const rotatingTexts = content?.rotatingTexts?.length ? content.rotatingTexts : DEFAULT_ROTATING;
  const tagline = content?.tagline ?? "Buying or refinancing, we focus on mortgage solutions that fit your life, your goals, and your future.";
  const ctaPrimary = content?.ctaPrimaryText ?? "Buying";
  const ctaSecondary = content?.ctaSecondaryText ?? "Refinance";
  const logoUrl = content?.logoUrl ? (content.logoUrl.startsWith("http") ? content.logoUrl : content.logoUrl) : null;

  const text = mainHeading;
  const letters = text.split("");
  const words = text.split(" ");

  // --- REACTIVE WIDTH CHECK (safe for SSR: set in useEffect) ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Deterministic video selection to avoid hydration mismatch
  const videoSource =
    (Array.isArray(content?.videoUrls)
      ? content.videoUrls.map((u) => u && String(u).trim()).filter(Boolean)[0]
      : null) || LOCAL_VIDEOS[0];

  const mainHeadingRef = useRef(null);
  const videoRef = useRef(null);
  const typewriterTextRef = useRef(null); // Ref for the text span

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [videoSource]);

  useEffect(() => {
    if (mainHeadingRef.current) {
      const letters = mainHeadingRef.current.querySelectorAll(".letter");
      gsap.set(letters, { opacity: 0, y: 10 });
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, [mainHeading]);

  // --- REAL GSAP TYPEWRITER LOGIC ---
  useEffect(() => {
    let mainTimeline = gsap.timeline({ repeat: -1 });

    rotatingTexts.forEach((text) => {
      mainTimeline
        .to(typewriterTextRef.current, {
          duration: text.length * 0.08, // Typing speed based on length
          text: { value: text },
          ease: "none",
        })
        .to({}, { duration: 1.5 }) // Pause after typing
        .to(typewriterTextRef.current, {
          duration: text.length * 0.04, // Faster erasing
          text: { value: "" },
          ease: "none",
        })
        .to({}, { duration: 0.5 }); // Short pause before next word
    });

    return () => mainTimeline.kill();
  }, [rotatingTexts]);


  const router = useRouter();



  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-[12vh] sm:pt-[8vh] md:pt-[5vh]">
      <video
        key={videoSource}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#191919]/60"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] pt-[8vh] min-[375px]:pt-[6vh] sm:pt-[5vh] mx-auto flex flex-col items-center">
      <h1
          ref={mainHeadingRef}
          className="text-white text-[clamp(1.5rem,6vw,2.5rem)] sm:text-[clamp(1.5rem,4vw,4rem)] font-bold leading-tight uppercase text-center flex flex-wrap justify-center"
        >
          {isMobile ? (
            // MOBILE: Wrap by words to prevent "Experience" from cutting
            <div className="flex flex-wrap justify-center gap-x-[0.3em]">
              {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((letter, letterIdx) => (
                    <span key={letterIdx} className="letter inline-block">
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ) : (
            // DESKTOP: Original letter-by-letter rendering
            <div className="whitespace-nowrap">
              {letters.map((letter, index) => (
                <span key={index} className="letter inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          )}
        </h1>
        <h1 className="text-white text-[clamp(1.25rem,5vw,2.5rem)] sm:text-[clamp(1.5rem,4vw,4rem)] font-bold leading-tight uppercase whitespace-normal sm:whitespace-nowrap text-center">
          {subHeading}
        </h1>

        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
            <Button onClick={()=>{router.push("/purchase")}} label={ctaPrimary} bgColor="#FF6B6B" dotColor="#1a1a1a" />
            <button onClick={()=>{router.push("/refinance2")}} className="cursor-pointer group mt-0 sm:mt-12 min-w-[180px] sm:min-w-[212px] h-[45px] sm:h-[50px] rounded-[120px] bg-[#FFFFFF] text-black font-semibold text-base sm:text-lg md:text-[20px] relative overflow-hidden flex items-center justify-center transition-transform duration-300 hover:text-white hover:font-bold hover:scale-110 px-6">
              <span className="relative z-20">{ctaSecondary}</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-black rounded-full transition-all duration-300 ease-out border-2 sm:border-[3px] md:border-[4px] border-[#FFFFFF] group-hover:-top-2 group-hover:right-8 sm:group-hover:right-10 group-hover:w-16 sm:group-hover:w-20 group-hover:h-16 sm:group-hover:h-20 z-10" />
              <span className="absolute -top-2 right-4 sm:right-5 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#E6FF4B] rounded-full transition-all duration-300 ease-out group-hover:top-4 sm:group-hover:top-5 group-hover:-right-2 group-hover:w-14 sm:group-hover:w-17 group-hover:h-14 sm:group-hover:h-17 z-7" />
              <span className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#E6FF4B] rounded-full transition-all duration-300 ease-out group-hover:-top-2 group-hover:-left-0 group-hover:w-10 sm:group-hover:w-12 group-hover:h-10 sm:group-hover:h-12 z-10" />
              <span className="absolute -bottom-1 left-2 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full border-2 sm:border-[3px] md:border-[4px] border-[#FFFFFF] transition-all duration-300 ease-out group-hover:bottom-0 group-hover:left-8 sm:group-hover:left-10 group-hover:w-16 sm:group-hover:w-20 group-hover:h-16 sm:group-hover:h-20 z-10" />
            </button>
          </div>
        </div>

        <p className="mt-2 sm:mt-3 md:mt-4 text-white/90 text-base sm:text-lg md:text-xl lg:text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed max-w-2xl mx-auto font-medium">
          {tagline}
        </p>

        <h1 className="text-white mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-[clamp(1.1rem,5vw,2rem)] font-bold leading-tight uppercase text-center min-h-[3.5em] sm:min-h-[1.5em]">
          <Image src={logoUrl || Logo} alt="" height={30} width={230} className="w-[180px] sm:w-[260px] md:w-[200px] object-contain" />
          <div className="inline-flex items-center">
            <span ref={typewriterTextRef} className="inline-block tracking-wide"></span>
            <span className="w-[3px] h-[1em] bg-white ml-1 animate-pulse"></span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;