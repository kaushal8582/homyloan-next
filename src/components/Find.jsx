"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { useHeroVideo } from "../hooks/useHeroVideo";

const Find = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

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
  
  const heading = content?.heading || "Find a Mortgage Loan Officer";
  const subheading = content?.subheading || "Welcome to the Easiest Home Loan Experience!";
  const description = content?.description || "Apply in just one minute and take the first step toward owning your dream home today.";
  const ctaText = content?.ctaText || "Start Your Application";
  const videoSrc = content?.videoUrl || selectedVideo;

  const validateZipCode = (zip) => {
    // Remove any spaces or dashes
    const cleanedZip = zip.replace(/[\s-]/g, '');
    // Check if it's 5 or 6 digits
    return /^\d{5,6}$/.test(cleanedZip);
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    // Clear error when user starts typing
    if (zipCodeError) {
      setZipCodeError("");
    }
  };

  const handleStartApplication = () => {
    // Validate zip code if provided
    if (zipCode.trim()) {
      if (!validateZipCode(zipCode.trim())) {
        setZipCodeError("Please enter a valid 5 or 6-digit ZIP code");
        return;
      }
      // Navigate with zip code in URL
      router.push(`/survey?zipCode=${zipCode.trim()}`);
    } else {
      // Navigate without zip code if not provided
      router.push("/survey");
    }
  };
  
  return (
    <section className="relative w-full min-h-screen overflow-hidden py-20 sm:py-24 lg:py-0">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="Find a Loan Officer"
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content Wrapper */}
      <div className=" max-w-[1480px] mx-auto relative z-10 h-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 md:px-10 lg:px-20 gap-8 lg:gap-12 py-20">
        {/* Left Content */}
        <div className="w-full lg:max-w-xl text-white text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-5 lg:mb-6 uppercase leading-tight">
            {heading}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6 uppercase">
            {subheading}
          </p>

          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {description}
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full sm:w-[90%] md:w-[400px] lg:w-[350px] backdrop-blur-md bg-white/10 rounded-xl p-5 sm:p-6 border border-white/20 flex-shrink-0">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-center">
            Enter your ZIP Code
          </h3>

          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={handleZipCodeChange}
            maxLength={10}
            className={`w-full mb-3 px-3 py-2.5 rounded-md bg-white outline-none text-sm focus:ring-2 focus:ring-[#FF6B6B] ${
              zipCodeError ? "border-2 border-red-500" : ""
            }`}
          />
          {zipCodeError && (
            <p className="mb-3 text-sm text-red-400 text-center">{zipCodeError}</p>
          )}

          <input
            type="text"
            placeholder="Search radius"
            className="w-full mb-3 px-3 py-2.5 rounded-md bg-white outline-none text-sm focus:ring-2 focus:ring-[#FF6B6B]"
          />

          <input
            type="text"
            placeholder="300 Miles"
            className="w-full mb-3 px-3 py-2.5 rounded-md bg-white outline-none text-sm focus:ring-2 focus:ring-[#FF6B6B]"
          />

          <input
            type="text"
            placeholder="100 Results"
            className="w-full px-3 py-2.5 rounded-md bg-white outline-none text-sm focus:ring-2 focus:ring-[#FF6B6B]"
          />

          <Button
            onClick={handleStartApplication}
            label={ctaText}
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
            className="!w-full !mt-5"
          />
        </div>
      </div>
    </section>
  );
};

export default Find;
