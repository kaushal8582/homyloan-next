"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import { useHeroVideo } from '../hooks/useHeroVideo';

const Homebuyer = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const pillText = content?.pillText || "HOMY LOANS";
  const heading = content?.heading || "Homebuyer's guide";
  const ctaText = content?.ctaText || "Check Today's Rate";
  const videoSrc = content?.videoUrl || selectedVideo;
  
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="VA Loans"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src={typeof videoSrc === "string" ? videoSrc : (videoSrc?.default ?? videoSrc)} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white pt-8 sm:pt-6 md:pt-4">
        <div className="inline-flex items-center justify-center px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 mb-4 sm:mb-5 lg:mb-6 rounded-full border border-white/40 text-xs sm:text-sm tracking-wide">
          {pillText}
        </div>
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase">
          {heading}
        </h1>
        <div className="flex justify-center mt-5 sm:mt-6 lg:mt-8">
          <Button
            onClick={() => router.push("/applynow")}
            label={ctaText}
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
          />
        </div>
      </div>
    </section>
  );
}

export default Homebuyer
