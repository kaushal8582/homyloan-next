import React from 'react'

const Terms = ({ content }) => {
  const heading = content?.heading || "Mortgage Terms Defined";
  const description = content?.description || "";
  const image = content?.image || "/MorgageTermDefined.svg";
  
  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#F6F6F6] rounded-3xl sm:rounded-[35px] lg:rounded-[40px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase">
            {heading}
          </h2>
        </div>

        {/* Image */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="Mortgage Terms"
              className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover"
            />
          </div>
        </div>
        <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm md:text-base lg:text-lg text-black/60 leading-relaxed font-normal text-center px-2 sm:px-4">
          {description.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < description.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

export default Terms
