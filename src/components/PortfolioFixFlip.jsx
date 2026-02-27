"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { mergeWithDefaults } from "../utils/contentMerge";

const defaultFixFlip = {
  heading: "FIX N FLIP LOANS (INVESTMENT FOCUS)",
  description: "Designed for investors buying a property, repairing it, and quickly selling it for a profit.",
  ctaLabel: "Explore",
};

const defaultImages = ["/fix2.svg", "/Portfolio_Lending.svg"];

export default function PortfolioFixFlip({ content }) {
  const router = useRouter();
  const f = mergeWithDefaults(defaultFixFlip, content);
  const displayBg = f.imageUrl || "/fix1.svg";
  const displayImages = f.imageUrl ? [f.imageUrl, "/fix2.svg"] : defaultImages;
  const [bgImage, setBgImage] = useState(displayBg);
  const [images, setImages] = useState(displayImages);

  useEffect(() => {
    if (f.imageUrl) {
      setBgImage(f.imageUrl);
      setImages([f.imageUrl, "/fix2.svg"]);
    } else {
      setBgImage("/fix1.svg");
      setImages(defaultImages);
    }
  }, [f.imageUrl]);

  const onImageClick = (img) => {
    setBgImage(img);
    setImages((prev) => {
      if (prev[0] === img) return prev;
      return [img, prev[0]];
    });
  };

  const activeBg = bgImage || displayBg;
  const activeImages = images.length ? images : displayImages;

  return (
    <section className="relative mt-12 sm:mt-16 lg:mt-20 w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[25px] gap-8 lg:gap-12">
      {activeBg && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 rounded-2xl sm:rounded-3xl lg:rounded-[25px] transition-all duration-500 blur-lg shadow-[0_0_60px_10px_rgba(0,0,0,0.25)]"
          style={{ backgroundImage: `url(${activeBg})` }}
        />
      )}
      <div className="relative z-10 w-full lg:max-w-[900px] text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-semibold uppercase tracking-[1px] text-white leading-[110%]">
          {f.heading}
        </h1>
        <p className="mt-6 sm:mt-7 lg:mt-8 text-sm sm:text-base lg:text-[16px] font-normal leading-[150%] text-white/90 max-w-full sm:max-w-[600px] lg:max-w-[540px] mx-auto lg:mx-0">
          {f.description}
        </p>
        <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
          <Button
            onClick={() => router.push("/applynow")}
            label={f.ctaLabel}
            bgColor="#E6FF4B"
            dotColor="#1a1a1a"
            className="!w-auto sm:!w-[28vw] lg:!w-[18vw]"
          />
        </div>
      </div>
      {/* RIGHT IMAGES */}
      <div className="relative z-10 flex gap-4 sm:gap-6 lg:gap-10 flex-shrink-0 justify-center">
        {activeImages.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => onImageClick(img)}
            className="
              w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-60 lg:w-[260px] lg:h-[340px] 
              rounded-xl sm:rounded-2xl lg:rounded-[25px] object-cover 
              cursor-pointer hover:scale-105 transition-all duration-300
              shadow-[0_20px_40px_rgba(0,0,0,0.25)]
            "
            alt="Fix and Flip"
          />
        ))}
      </div>
    </section>
  );
}

