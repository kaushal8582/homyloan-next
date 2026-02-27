"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = Array.from({ length: 22 }, (_, i) => `/logo${i + 1}.png`);

const Logos = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });

    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="relative w-full">
        <div ref={trackRef} className="flex gap-16 w-max">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index + 1}`}
              className="h-10 sm:h-12 md:h-14 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
