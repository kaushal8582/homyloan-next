"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import { useHeroVideo } from '../hooks/useHeroVideo';

const MarketingSales = () => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0 pt-10">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={selectedVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight uppercase mt-8 sm:mt-10 lg:mt-12">
          Marketing & Sales
        </h1>

        <p className="mt-5 sm:mt-6 lg:mt-8 max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
          Help us tell the HomyLoans story. Join our marketing and sales team to create compelling campaigns, 
          build brand awareness, and connect with customers who are ready to make their homeownership dreams come true.
        </p>

        <div className="flex justify-center mt-8 sm:mt-10">
          <Button
            onClick={() => router.push("/open-positions")}
            label="View Open Positions"
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
            className="!w-auto sm:!w-[35vw] lg:!w-[20vw]"
          />
        </div>
      </div>
    </section>
  );
};

export default MarketingSales;
