import React from 'react'
import { useHeroVideo } from '../hooks/useHeroVideo';

const FAQHero = () => {
  const { videoRef, selectedVideo } = useHeroVideo();
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-0">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="Frequently Asked Questions"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src={selectedVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center justify-center px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 mb-4 sm:mb-5 lg:mb-6 rounded-full border border-white/40 text-xs sm:text-sm tracking-wide">
          HOMY LOANS
        </div>
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase">
          Frequently Asked <br /> Questions
        </h1>
      </div>
    </section>
  );
}

export default FAQHero
