"use client";

import React, { useState } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { useHeroVideo } from "../hooks/useHeroVideo";

const ApplyNow = ({ content }) => {
  const router = useRouter();
  const { videoRef, selectedVideo } = useHeroVideo();
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  
  const heading = content?.heading || "Unlock Your Dream Home: Find the";
  const headingLine2 = content?.headingLine2 || "Perfect Mortgage";
  const subheading = content?.subheading || "Welcome to the Easiest Home Loan Experience!";
  const description = content?.description || "Apply in just one minute and take the first step toward owning your dream home today.";
  const zipCodeLabel = content?.zipCodeLabel || "Enter your ZIP Code";
  const zipCodePlaceholder = content?.zipCodePlaceholder || "Enter Your Zip Code";
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
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image - commented, replaced with video: style={{ backgroundImage: "url('/VA_BG.svg')", backgroundSize: "cover", backgroundPosition: "center" }} */}
      {/* Background Image - commented, replaced with video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={typeof videoSrc === "string" ? videoSrc : (videoSrc?.default ?? videoSrc)} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center text-white mt-30">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase">
          {heading} <br className="hidden sm:block" />
          {headingLine2}
        </h1>

        <p className="mt-4 text-4xl sm:text-3xl font-semibold text-white/80 uppercase">
          {subheading}
        </p>

        <p className="mt-2 text-base font-normal text-white/70 max-w-3xl mx-auto">
          {description}
        </p>

        {/* Zip Code Card */}
        <div className="mt-10 mx-auto max-w-xl backdrop-blur-md bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
          <p className="mb-4 text-sm font-medium text-white">
            {zipCodeLabel}
          </p>

          <input
            type="text"
            placeholder={zipCodePlaceholder}
            value={zipCode}
            onChange={handleZipCodeChange}
            maxLength={10}
            className={`w-full rounded-full px-6 py-3 text-black text-sm bg-[#f2f2f2] focus:outline-none ${
              zipCodeError ? "border-2 border-red-500" : ""
            }`}
          />
          {zipCodeError && (
            <p className="mt-2 text-sm text-red-400 text-center">{zipCodeError}</p>
          )}

<Button
  onClick={handleStartApplication} 
  label={ctaText}
  bgColor="#FF6B6B"
  dotColor="#1a1a1a"
  className="!w-full"
/>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
