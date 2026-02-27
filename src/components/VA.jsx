"use client";

import React from "react";
import Button from "../UI/Button";
import { useRef,useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { mergeWithDefaults } from "../utils/contentMerge";

const VIDEO_PATHS = [
  "/videos/Homy Loan (7).mp4",
  "/videos/Homy Loan (8).mp4",
  "/videos/Homy Loan (9).mp4",
  "/videos/Homy Loan (10).mp4",
];

const defaultHero = {
  heading: "VA LOANS",
  description:
    "VA Loans help veterans, service members, and eligible families achieve homeownership with no down payment, no PMI, flexible qualifications, and competitive rates. At Homy Loans, we're proud to support those who've served by making this benefit accessible.",
  ctaLabel: "Check Today's Rate",
};

const VA = ({ content }) => {
  const videos = VIDEO_PATHS;
  const hero = mergeWithDefaults(defaultHero, content?.hero);
  const videoUrl = hero.videoUrl && typeof hero.videoUrl === "string" && hero.videoUrl.trim() ? hero.videoUrl.trim() : null;
  const [fallbackVideo] = useState(VIDEO_PATHS[0]);
  const videoSrc = videoUrl || fallbackVideo;
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [videoSrc]);
  const router = useRouter();

  return (
    <section className="relative w-full h-screen sm:h-screen lg:h-screen overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline key={videoSrc}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 h-full flex items-end justify-start px-4 sm:px-6 md:px-10 lg:px-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl text-white text-center sm:text-left w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-5 lg:mb-6 uppercase">{hero.heading}</h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-xl mx-auto sm:mx-0">{hero.description}</p>
          <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center sm:justify-start">
            <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VA;
