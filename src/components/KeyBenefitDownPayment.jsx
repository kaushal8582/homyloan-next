import React from 'react'
import Button from '../UI/Button';
const cards = [
  {
    title: "Reduced Out of Pocket Costs",
    iconSrc: "/Mortage5.svg",
    description: "Reduced Out of Pocket Costs",
    style: {borderTopRightRadius:"30px", borderBottomLeftRadius:"30px", borderTopLeftRadius:"60px", borderBottomRightRadius:"60px"},
  },
  {
    title: "State and Local Programs",
    iconSrc: "/Mortage5.svg",
    description:
      "Explore refinancing solutions designed to lower rates and payments.",
    style: {borderTopRightRadius:"70px", },
  },
  {
    title: "Faster Homeownership",
    iconSrc: "/Mortage5.svg",
    description: "lorem dduwchdw wdfedwgfvdewwdg dw",
    style: {borderTopRightRadius:"80px", borderBottomLeftRadius:"70px"},
  },
  {
    title: "Flexible Options",
    iconSrc: "/Mortage5.svg",
    description: "Finance home improvements and renovations with ease.",
    style: {borderTopRightRadius:"80px", borderBottomLeftRadius:"90px"},
  },
];
const KeyBenefitDownPayment = ({ content }) => {
  return (
    <section className="w-full bg-black text-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight px-2 sm:px-6 lg:px-20 uppercase">
          Key Benefits of Down Payment Assistance
        </h1>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70 max-w-3xl mx-auto px-2 sm:px-4 lg:px-0">
          DPA programs are crucial for making homeownership accessible,
          particularly for first time homebuyers.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 sm:mt-16 lg:mt-20 max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-20">
        {/* Top row – LEFT on desktop, center on mobile */}
        <div className="flex justify-center lg:justify-start px-0 sm:px-4 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-60 xl:gap-96 place-items-center">
            {cards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                style={card.style}
                className="
                  group relative
                  w-36 h-36 sm:w-40 sm:h-40 lg:w-[160px] lg:h-[160px]
                  rounded-3xl lg:rounded-[45px]
                  bg-white text-black
                  transition-all duration-700 ease-out
                  hover:scale-110 lg:hover:scale-150
                  lg:hover:rounded-[32px]
                  overflow-hidden
                  cursor-pointer
                  hover:z-10
                "
              >
                {/* Default */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 group-hover:opacity-0">
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>

                {/* Hover */}
                <div
                  className="
                    absolute inset-0 p-4 sm:p-5
                    flex flex-col items-center justify-center
                    opacity-0 translate-y-3 scale-[0.95]
                    transition-all duration-500 ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-hover:scale-[1]
                    bg-[#E6FF4BCC]
                  "
                >
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row – RIGHT on desktop, center on mobile */}
        <div className="flex justify-center lg:justify-end px-0 sm:px-4 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-60 xl:gap-96 place-items-center">
            {cards.slice(2, 4).map((card, index) => (
              <div
                key={index + 3}
                style={card.style}
                className="
                  group relative
                  w-36 h-36 sm:w-40 sm:h-40 lg:w-[160px] lg:h-[160px]
                  rounded-3xl lg:rounded-[45px]
                  bg-white text-black
                  transition-all duration-700 ease-out
                  hover:scale-110 lg:hover:scale-150
                  lg:hover:rounded-[32px]
                  overflow-hidden
                  cursor-pointer
                  hover:z-10
                "
              >
                {/* Default */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 group-hover:opacity-0">
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>

                {/* Hover */}
                <div
                  className="
                    absolute inset-0 p-4 sm:p-5
                    flex flex-col items-center justify-center
                    opacity-0 translate-y-3 scale-[0.95]
                    transition-all duration-500 ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-hover:scale-[1]
                    bg-[#E6FF4BCC]
                  "
                >
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <p className="text-xs sm:text-sm font-medium text-center px-3 sm:px-4">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyBenefitDownPayment