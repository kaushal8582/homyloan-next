import React, { useMemo } from "react";
import { useHeroVideo } from "../hooks/useHeroVideo";

const DEFAULT_LEADERS = [
  {
    name: "Nick Hunt",
    role: "Chief Financial Officer",
    image: "/Leader.svg",
  },
  {
    name: "Nick Hunt",
    role: "Chief Financial Officer",
    image: "/Leader.svg",
  },
  {
    name: "Nick Hunt",
    role: "Chief Financial Officer",
    image: "/Leader.svg",
  },
];

const OurLeadershipTeam = ({ content }) => {
  const { videoRef, selectedVideo } = useHeroVideo();
  const heading = content?.hero?.heading || "Our Leadership Team";
  const videoUrl = useMemo(() => {
    const urls = content?.hero?.videoUrls;
    if (Array.isArray(urls) && urls.length > 0) {
      const valid = urls.map((u) => (u && String(u).trim())).filter(Boolean);
      if (valid.length > 0) return valid[Math.floor(Math.random() * valid.length)];
    }
    const legacy = content?.hero?.videoUrl?.trim?.();
    if (legacy) return legacy;
    return selectedVideo;
  }, [content?.hero?.videoUrls, content?.hero?.videoUrl, selectedVideo]);
  const leaders = content?.leaders?.length ? content.leaders : DEFAULT_LEADERS;

  return (<>
    <section className="relative w-full h-[80vh] pb-32 sm:pb-40 lg:pb-48">
      {/* Background Image - commented, replaced with video */}
      {/* <img
        src="/VA_BG.svg"
        alt="Leadership Background"
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
        {/* Heading */}
        <h1 className="pt-12 sm:pt-20 lg:pt-20 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase">
          {heading}
        </h1>


      </div>
    </section>

    <div className='relative' >
      {/* Cards */}
      <div className=" absolute z-[9999] top-[-40px] lg:top-[-200px]
 relative max-w-6xl mx-auto grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="relative h-32 sm:h-48 md:h-56 lg:h-72 xl:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl bg-white"
            style={{
              backgroundImage: `url(${leader.image || "/Leader.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 w-full p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-center text-white">
              <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold">{leader.name}</h3>
              <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-white/80 mt-0.5 sm:mt-1">{leader.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </>
  );
};

export default OurLeadershipTeam;
