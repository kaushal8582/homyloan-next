"use client";

import { useState } from "react";
import girlImage from "../assets/renvotationstylegirl.jpg";
import interiorImage from "../assets/renvotationstyle.jpg";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
export default function Renovation_Homestyle({ content }) {
  const router = useRouter();
  const [bgImage, setBgImage] = useState(girlImage);
  const [images, setImages] = useState([girlImage, interiorImage]);

  const onImageClick = (img) => {
    setBgImage(img);

    setImages((prev) => {
      if (prev[0] === img) return prev;
      return [img, prev[0]];
    });
  };

  return (
    <section className="relative mt-12 sm:mt-16 lg:mt-20 w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center lg:items-start justify-between overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[25px] gap-8 lg:gap-12">
      {/* BACKGROUND IMAGE (ONLY WHEN CLICKED) */}
      {bgImage && (
        <div
          className="
            absolute inset-0 
            bg-cover bg-center 
            opacity-80
            rounded-2xl sm:rounded-3xl lg:rounded-[25px]
            transition-all duration-500 
            blur-lg
            shadow-[0_0_60px_10px_rgba(0,0,0,0.25)]
          "
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      )}

      {/* TEXT SECTION */}
      <div className="relative z-10 w-full lg:max-w-[900px] text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-semibold uppercase tracking-[1px] text-white leading-[110%]">
          HOMESTYLE RENOVATION <br className="hidden sm:block" /> LOAN (CONVENTIONAL)
        </h1>

        <p className="mt-6 sm:mt-7 lg:mt-8 text-sm sm:text-base lg:text-[16px] font-normal leading-[150%] text-white/90 max-w-full sm:max-w-[600px] lg:max-w-[540px] mx-auto lg:mx-0">
          VA Loans help veterans, service members, and eligible families achieve homeownership 
          with no down payment, no PMI, flexible qualifications, and competitive rates. At 
          Homy Loans, we're proud to support those who've served by making this benefit 
          accessible.
        </p>

        <div className="flex justify-center lg:justify-start mt-6 sm:mt-7 lg:mt-8">
          <Button
              onClick={() => router.push("/applynow")}
            label="Check Today's Rates"
            bgColor="#FF6B6B"
            dotColor="#1a1a1a"
            className="!w-auto sm:!w-[28vw] lg:!w-[18vw]"
          />
        </div>
      </div>
      {/* RIGHT IMAGES */}
      <div className="relative z-10 flex gap-4 sm:gap-6 lg:gap-10 flex-shrink-0 justify-center lg:justify-start">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => onImageClick(img)}
            className="
              w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-60 lg:w-[260px] lg:h-[340px] 
              rounded-xl sm:rounded-2xl lg:rounded-[25px] object-cover 
              cursor-pointer hover:scale-105 transition-all duration-300
              shadow-[0_20px_40px_rgba(0,0,0,0.25)]
            "
            alt="Renovation Style"
          />
        ))}
      </div>
    </section>
  );
}