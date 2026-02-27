import React from "react";
import { Check } from "lucide-react";

const WhyFitlife = ({ content }) => {
  const heading = content?.heading || "Why Choose Fitlife Studio?";
  const items = content?.items?.length ? content.items : [
    { title: "Human-Centered Culture", description: "We believe in the power of personal connections. You're not just an employee; you're a valued member of a team that prioritizes empathy, collaboration, and mutual respect." },
    { title: "Comprehensive Training", description: "From day one, you'll receive the tools and knowledge needed to succeed. Our training programs are designed to equip you with industry-leading skills and insights." },
    { title: "Innovative Technology", description: "Leverage modern tools and platforms that streamline the process, allowing you to focus on what truly matters—serving clients." },
  ];
  const images = content?.images?.length === 3 ? content.images : ["/WhyFitlife.svg", "/WhyFitlife2.svg", "/WhyFitlife3.svg"];

  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">
        {/* Left Images */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <img
            src={images[0] || "/WhyFitlife.svg"}
            alt="Luxury Home"
            className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-xl sm:rounded-2xl"
          />
          <img
            src={images[1] || "/WhyFitlife2.svg"}
            alt="Modern House"
            className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-xl sm:rounded-2xl"
          />
          <img
            src={images[2] || "/WhyFitlife3.svg"}
            alt="Waterfront Home"
            className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-xl sm:rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight uppercase">
            {heading.includes('\n') ? (
              heading.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < heading.split('\n').length - 1 && <br className="hidden sm:block" />}
                </React.Fragment>
              ))
            ) : (
              <>
                {heading.split(' ').slice(0, 2).join(' ')} <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>{heading.split(' ').slice(2).join(' ')}
              </>
            )}
          </h2>

          <div className="mt-8 sm:mt-9 lg:mt-10 space-y-6 sm:space-y-8 lg:space-y-10">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4 text-left">
                <img
                  src="/tick.svg"
                  alt=""
                  className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 flex items-center justify-center mt-1"
                />
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                    {item.title}
                  </h4>
                  <p className="mt-1 sm:mt-1.5 text-sm sm:text-base md:text-lg text-black/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFitlife;
