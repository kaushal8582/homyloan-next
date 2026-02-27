"use client";

import React, { useRef, useEffect } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { useHeroVideo } from "../hooks/useHeroVideo";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultSolutions = {
  heading: "THE HOMY LOANS JUMBO LOAN SOLUTIONS",
  body:
    "We offer a specialized suite of Jumbo products designed to fit your unique financial needs. Our features include large loan amounts, flexible terms like 30 year fixed options, and Cash Out Refinance to access home equity. We also permit financing for non warrantable condominiums and offer streamlined qualification to simplify the process. Plus, our VA Jumbo option allows eligible veterans to use their benefits for higher loan amounts, potentially with no down payment.",
  ctaLabel: "Check Today's Rate",
  videoUrl: "",
};

export default function JumboLoanSolution({ content }) {
  const router = useRouter();
  const solutions = mergeWithDefaults(defaultSolutions, content?.solutions);
  const videoUrl = solutions.videoUrl && typeof solutions.videoUrl === "string" && solutions.videoUrl.trim() ? solutions.videoUrl.trim() : null;
  const { videoRef, selectedVideo } = useHeroVideo();
  const videoSrc = videoUrl || selectedVideo;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [videoSrc]);

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[95vh] overflow-hidden py-20 sm:py-24 lg:py-0">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        key={videoSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 text-center lg:text-left">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[65px] font-medium leading-[120%] uppercase max-w-[900px] mx-auto lg:mx-0">
          {(solutions.heading || "").split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < (solutions.heading || "").split("\n").length - 1 && <br className="hidden sm:block" />}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[23px] font-medium leading-[140%] lg:leading-[120%] mt-6 sm:mt-7 lg:mt-8 max-w-[980px] mx-auto lg:mx-0">
          {solutions.body}
        </p>

        <div className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start">
          <Button onClick={() => router.push("/applynow")} label={solutions.ctaLabel} bgColor="#FF6B6B" dotColor="#1a1a1a" />
        </div>
      </div>
    </section>
  );
}
