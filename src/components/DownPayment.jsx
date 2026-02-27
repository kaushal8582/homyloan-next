"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { useHeroVideo } from "../hooks/useHeroVideo";

const DownPayment = () => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  return (
    <section className="relative w-full h-[90vh] min-h-[800px] overflow-hidden flex items-center justify-center">
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
        {/* SMALL PILL */}
        <div className="inline-flex items-center justify-center px-4 mb-6 rounded-full border border-white/40 text-sm tracking-wide">
          HOMY LOANS
        </div>

        {/* HEADING */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          DOWNPAYMENT ASSISTANCE
          <br />
          LOANS
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/90">
          Homeownership gives stability, community, and fulfillment, not just
          financial benefits. Homy Loans offers programs from just 3% down.
          Let’s clear up common homebuying myths so you can proceed confidently.
        </p>

        {/* CTA BUTTON */}
        <div className="flex justify-center">
          <Button onClick={() => router.push("/applynow")} label="Check Today's Rate" bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
};

export default DownPayment;
