"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
const DEFAULT_STORIES = [
  { id: 1, image: "/Good_1.svg", title: "Modern Family Home" },
  { id: 2, image: "/Good_2.svg", title: "Contemporary Living" },
  { id: 3, image: "/Good_3.svg", title: "Traditional Charm" },
  { id: 4, image: "/Good_4.svg", title: "Green Architecture" },
];

const GoodHuman = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = content?.stories?.length ? content.stories : DEFAULT_STORIES;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 4 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= stories.length - 4 ? 0 : prev + 1));
  };

  const visibleStories = stories.slice(currentIndex, currentIndex + 4);

  const router = useRouter();



  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16">
          {/* Left side - Circular images in 2x2 grid with decorative element */}
          <div className="relative flex-shrink-0">
            <div className="grid grid-cols-2 gap-[clamp(12px,2vw,24px)] w-[clamp(240px,50vw,340px)]">
              {visibleStories.map((story) => (
                <div
                  key={story.id}
                  className="w-[clamp(110px,23vw,160px)] h-[clamp(110px,23vw,160px)] rounded-full overflow-hidden shadow-xl"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Decorative yellow-green star/diamond shape in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <svg
                width="100"
                height="100"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[clamp(70px,15vw,120px)] h-[clamp(70px,15vw,120px)]"
              >
                <path
                  d="M60 0C60 33.137 86.863 60 120 60C86.863 60 60 86.863 60 120C60 86.863 33.137 60 0 60C33.137 60 60 33.137 60 0Z"
                  fill="#C5E17A"
                />
              </svg>
            </div>
          </div>

          {/* Middle - Content with button and arrows */}
          <div className="flex-1 space-y-4 sm:space-y-6 max-w-xl text-center lg:text-left">
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold text-gray-900 leading-tight">
              Good Human Stories
            </h2>
            <p className="text-gray-600 leading-relaxed text-[clamp(13px,2.5vw,16px)]">
              Lorem Ipsum: The industry standard since the 1500s. It is derived
              from a 1st-century BC Latin text by Cicero, De finibus bonorum et
              malorum, but scrambled to be nonsensical.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <button onClick={()=>{router.push("/goodhuman")}} className=" cursor-pointer bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[clamp(13px,2.2vw,14px)] font-medium transition-all inline-flex items-center gap-2">
                Explore More
                <span>→</span>
              </button>
            </div>
            {/* Navigation arrows next to button */}
            {/* <div className="flex gap-3 justify-center lg:justify-end">
              <button
                onClick={handlePrevious}
                className="w-[clamp(36px,8vw,48px)] h-[clamp(36px,8vw,48px)] rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-[clamp(18px,4vw,24px)] h-[clamp(18px,4vw,24px)] text-gray-900" />
              </button>
              <button
                onClick={handleNext}
                className="w-[clamp(36px,8vw,48px)] h-[clamp(36px,8vw,48px)] rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-[clamp(18px,4vw,24px)] h-[clamp(18px,4vw,24px)] text-gray-900" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodHuman;
