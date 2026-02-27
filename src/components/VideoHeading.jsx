import React from "react";
import { useHeroVideo } from "../hooks/useHeroVideo";

const VideoHeading = ({
  title,
  subtitle = "Fast approvals • Transparent rates • Minimal paperwork",
  eyebrow = "HOMY LOANS",
  ctaText = "Get Started",
  onCtaClick,
}) => {
  const { videoRef, selectedVideo } = useHeroVideo();

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-0">
      {/* VIDEO BACKDROP (enable if you want) */}
      {/* <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={selectedVideo} type="video/mp4" />
      </video> */}

      {/* BACKGROUND LAYERS */}
      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Soft vignette */}
      <div className="absolute inset-0 z-0 [background:radial-gradient(80%_60%_at_50%_30%,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0.75)_55%,rgba(0,0,0,0.95)_100%)]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 35%, transparent 70%)",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl z-0 opacity-40 bg-gradient-to-br from-fuchsia-500/60 via-purple-500/50 to-indigo-500/60 animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl z-0 opacity-35 bg-gradient-to-br from-cyan-400/60 via-sky-500/50 to-blue-600/60 animate-[pulse_7s_ease-in-out_infinite]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Eyebrow badge */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 sm:px-5 py-1.5 sm:py-2 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
          <span className="text-[11px] sm:text-xs tracking-[0.28em] font-semibold uppercase text-white/90">
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 sm:mt-7 lg:mt-8 font-extrabold uppercase leading-[1.05] tracking-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
              {title}
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        {/* <p className="mt-4 sm:mt-5 mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
          {subtitle}
        </p> */}

        {/* CTA row */}
        {/* <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center rounded-2xl px-6 sm:px-7 py-3 sm:py-3.5 font-semibold text-sm sm:text-base
                       bg-white text-black shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                       hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                       transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white via-white to-white/70" />
            <span className="relative">{ctaText}</span>
            <span className="relative ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </button>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
            No hidden charges
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
            Instant eligibility check
          </div>
        </div> */}

        {/* Bottom fade hint */}
        {/* <div className="pointer-events-none absolute left-0 right-0 -bottom-10 h-24 bg-gradient-to-t from-black/60 to-transparent" /> */}
      </div>
    </section>
  );
};

export default VideoHeading;
