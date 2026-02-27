import React from 'react'
import { useHeroVideo } from '../hooks/useHeroVideo';

const Amp = ({ content }) => {
  const { videoRef, selectedVideo } = useHeroVideo();
  const heading = content?.heading || "HOMY LOAN-AMP";
  
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-0">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="Homy Loan AMP"
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
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight uppercase">
          {heading}
        </h1>
      </div>
    </section>
  );
}

export default Amp
