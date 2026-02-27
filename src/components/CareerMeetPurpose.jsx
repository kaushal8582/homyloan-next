"use client";

import React, { useMemo } from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import { useHeroVideo } from '../hooks/useHeroVideo';

const CareerMeetPurpose = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const videoUrl = useMemo(() => {
    const urls = content?.videoUrls;
    if (Array.isArray(urls) && urls.length > 0) {
      const valid = urls.map((u) => (u && String(u).trim())).filter(Boolean);
      if (valid.length > 0) return valid[Math.floor(Math.random() * valid.length)];
    }
    const legacy = content?.videoUrl?.trim?.();
    if (legacy) return legacy;
    return selectedVideo;
  }, [content?.videoUrls, content?.videoUrl, selectedVideo]);
  const heading = content?.heading || "Career Meets Purpose";
  const headingLine2 = content?.headingLine2 || "LOANS";
  const subtext = content?.subtext || "At HomyLoans, we're more than just a mortgage lender—we're a community committed to transforming the homebuying experience. Whether you're an experienced mortgage professional or just starting out, we offer a supportive environment where your growth is our priority.";
  const ctaText = content?.ctaText || "See Open Positions";
  const videoSrc = content?.videoUrl || selectedVideo;
  
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0 pt-10">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="Career Meets Purpose"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <video
        key={videoUrl}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src={typeof videoSrc === "string" ? videoSrc : (videoSrc?.default ?? videoSrc)} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight uppercase mt-8 sm:mt-10 lg:mt-12">
          {heading}
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>{headingLine2}
        </h1>

        {/* SUBTEXT */}
        <p className="mt-5 sm:mt-6 lg:mt-8 max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
          {subtext}
        </p>

        {/* CTA BUTTON */}
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/open-positions")}
            label={ctaText}
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
            className="!w-[85%] sm:!w-[35vw] lg:!w-[20vw]"
          />
        </div>
      </div>
    </section>
  );
}

export default CareerMeetPurpose
