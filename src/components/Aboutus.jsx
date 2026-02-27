import React, { useMemo } from 'react'
import Button from '../UI/Button';
import { useHeroVideo } from '../hooks/useHeroVideo';

const Aboutus = ({ content }) => {
  const { videoRef, selectedVideo } = useHeroVideo();
  const heading = content?.heading || "About Us";
  const pillText = content?.pillText || "HOMY LOANS";
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

  return (
    <section className="relative w-full h-[90vh] h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="VA Loans"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <video
        key={videoUrl}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-6 text-center text-white mt-20">
        {/* SMALL PILL */}
        <div className="inline-flex items-center justify-center px-4 mb-6 rounded-full border border-white/40 text-sm tracking-wide">
          {pillText}
        </div>

        {/* HEADING */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight uppercase">
          {heading}
        </h1>
      </div>
    </section>
  );
}

export default Aboutus
