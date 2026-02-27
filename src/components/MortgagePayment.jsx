"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import { useHeroVideo } from '../hooks/useHeroVideo';

const MortgagePayment = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const heading = content?.heading || "Mortgage Payment";
  const ctaText = content?.ctaText || "Check Today's Rate";
  
  return (
    <section className="relative w-full h-[90vh] min-h-screen overflow-hidden flex items-center justify-center">
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
        <source src={selectedVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-6 text-center text-white mt-20">
        {/* HEADING */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight uppercase">
          {heading}
        </h1>
        <div className="flex justify-center mt-6">
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

export default MortgagePayment
