"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { useHeroVideo } from "../hooks/useHeroVideo";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultHero = {
  badge: "HOMY LOANS",
  heading: "Home Select Loan: The Checking Account Mortgage",
  description: "FHA Loan are often a popular choice for a first-time homebuyer.",
  ctaLabel: "Check Today Rates",
};

const HomeSelect = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const hero = mergeWithDefaults(defaultHero, content);
  const videoSrc = hero?.videoUrl || selectedVideo;
  const showImage = !videoSrc && hero?.imageUrl;
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0">
      {showImage ? (
        <img src={hero.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={typeof videoSrc === "string" ? videoSrc : (videoSrc?.default ?? videoSrc)} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center justify-center px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 mb-4 sm:mb-5 lg:mb-6 rounded-full border border-white/40 text-xs sm:text-sm tracking-wide mt-[80px]">
          {hero.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase">
          {hero.heading}
        </h1>
        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg">{hero.description}</p>
        <div className="flex justify-center mt-6 sm:mt-8">
          <Button onClick={() => router.push("/applynow")} label={hero.ctaLabel} bgColor="#E6FF4B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
};

export default HomeSelect

