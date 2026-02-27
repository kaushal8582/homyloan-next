"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/pagination";

const DEFAULT_TESTIMONIALS = [
  { name: "Jenny Wilson", role: "Web Developer", message: "OMG! I cannot believe that I have got a brand new landing page after getting appmax. It was super easy to edit and publish.", avatar: "/user1.svg" },
  { name: "Robert Fox", role: "Product Designer", message: "The process was smooth and intuitive. Everything worked exactly as expected.", avatar: "/user2.svg" },
  { name: "Esther Howard", role: "Founder", message: "Excellent service and great attention to detail. Highly recommended.", avatar: "/user3.svg" },
  { name: "Jenny Wilson", role: "Web Developer", message: "OMG! I cannot believe that I have got a brand new landing page after getting appmax. It was super easy to edit and publish.", avatar: "/user4.svg" },
  { name: "Robert Fox", role: "Product Designer", message: "The process was smooth and intuitive. Everything worked exactly as expected.", avatar: "/user5.svg" },
  { name: "Esther Howard", role: "Founder", message: "Excellent service and great attention to detail. Highly recommended.", avatar: "/user6.svg" },
];

const Client = ({ content }) => {
  const testimonials = content?.testimonials?.length ? content.testimonials : DEFAULT_TESTIMONIALS;
  const floatingAvatars = testimonials.map((t) => t.avatar).filter(Boolean);
  const swiperRef = useRef(null);
  const orbitRef = useRef(null);
  const avatarRefs = useRef([]);

  const orbitTween = useRef(null);
  const counterTween = useRef(null);

  useEffect(() => {
    // Orbit rotation (movement)
    orbitTween.current = gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    // Counter-rotate avatars so they stay upright
    counterTween.current = gsap.to(avatarRefs.current, {
      rotate: -360,
      duration: 30,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    return () => {
      orbitTween.current?.kill();
      counterTween.current?.kill();
    };
  }, []);

  const stopAll = () => {
    orbitTween.current?.pause();
    counterTween.current?.pause();
  };

  const playAll = () => {
    orbitTween.current?.resume();
    counterTween.current?.resume();
  };

  return (
    <section className="w-full bg-black text-white py-[10vh] md:py-[14vh] px-4 sm:px-6 relative overflow-hidden">
      {/* Heading */}
      <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-center mb-[8vh] md:mb-[10vh]">
        What our Client Says
      </h2>

      {/* Orbit container */}
      <div
        ref={orbitRef}
        onMouseEnter={stopAll}
        onMouseLeave={playAll}
        className="hidden lg:block absolute inset-0 pointer-events-none"
      >
        {floatingAvatars.map((img, i) => (
          <img
            key={i}
            ref={(el) => (avatarRefs.current[i] = el)}
            src={img}
            alt=""
            onClick={() =>
              swiperRef.current?.slideToLoop(i % testimonials.length)
            }
            className={`
              absolute w-[6rem] h-[6rem] rounded-full object-cover
              cursor-pointer pointer-events-auto
              ${i === 0 && "top-[15%] left-[50%] -translate-x-1/2"}
              ${i === 1 && "top-[30%] left-[20%]"}
              ${i === 2 && "bottom-[30%] left-[25%]"}
              ${i === 3 && "top-[30%] right-[20%]"}
              ${i === 4 && "bottom-[30%] right-[25%]"}
              ${i === 5 && "bottom-[15%] left-[50%] -translate-x-1/2"}
            `}
          />
        ))}
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination, Mousewheel]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        grabCursor={true}
        loop={true}
        loopPreventsSliding={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.5,
          releaseOnEdges: false,
          thresholdDelta: 30,
        }}
        speed={900}
        className="relative max-w-xl mx-auto z-10"
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="
                bg-white text-black rounded-2xl
                px-6 sm:px-8 md:px-10
                py-6 sm:py-8 md:py-10
                shadow-xl text-center
                h-[clamp(200px,20vw,220px)]
                flex flex-col justify-between
              "
            >
              <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-700 leading-relaxed flex-1 flex items-center justify-center">
                {item.message}
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
                />

                <div className="text-left">
                  <p className="font-semibold text-[clamp(0.875rem,1.2vw,1rem)]">
                    {item.name}
                  </p>
                  <p className="text-[clamp(0.75rem,1vw,0.875rem)] text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="absolute right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 text-gray-200 text-[clamp(3rem,8vw,4.5rem)]">
                "
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Client;
