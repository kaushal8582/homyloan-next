import React from "react";

const DEFAULT_CARDS = [
  {
    img: "/be1.svg",
    title: "Mortgage Rates Just Saw Their Biggest Drop in a Year",
    desc: "You've been waiting for what feels like forever for mortgage rates to finally budge. And last week, they did in a big way. On Friday, September 8th, the average 30-year",
  },
  {
    img: "/be2.svg",
    title: "Mortgage Rates Just Saw Their Biggest Drop in a Year",
    desc: "You've been waiting for what feels like forever for mortgage rates to finally budge. And last week, they did in a big way. On Friday, September 8th, the average 30-year",
  },
  {
    img: "/be3.svg",
    title: "Mortgage Rates Just Saw Their Biggest Drop in a Year",
    desc: "You've been waiting for what feels like forever for mortgage rates to finally budge. And last week, they did in a big way. On Friday, September 8th, the average 30-year",
  },
];

const BeAGoodHuman = ({ content }) => {
  const heading = content?.heading || "Be A Good Human";
  const description = content?.description || "It all started with a t-shirt. Now our Be A Good Human initiative is a driving force behind what it means to work at Homy Loans. Our number one Core Value is to \"Be Human\" – our way of adding a personal touch to the Mortgage Origination experience that cannot be found anywhere else. Whether in the office or off the clock, we at Homy Loans believe in the importance of giving back and sharing real-life examples of kindness from our own communities all while providing a unique human element to everything we do.";
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;

  return (
    <section className="w-full bg-white py-20 px-6 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold uppercase">
          {heading}
        </h2>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base text-black max-w-4xl mx-auto leading-relaxed font-semibold">
          {description}
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[#F7F7F7] rounded-2xl shadow-md overflow-hidden text-left hover:shadow-xl transition-shadow"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-[230px] object-cover"
              />

              <div className="p-6">
                <h3 className="font-semibold text-lg leading-snug">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeAGoodHuman;
