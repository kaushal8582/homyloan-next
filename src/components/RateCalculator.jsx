export default function RateCalculatorHero() {
  return (
    <div className="w-full">
      {/* 🌟 HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 mt-10">
        {/* Heading */}
        <h1
          className="
            text-[#101011]
            font-semibold
            uppercase
            leading-tight
            text-[36px]
            sm:text-[46px]
            md:text-[56px]
            lg:text-[65px]
            max-w-[1130px]
          "
        >
          Smart Mortgage Calculators
          <br />
          <span className="block py-3">To Guide Your Next Move</span>
        </h1>

        {/* Paragraph */}
        <p
          className="
            text-[#101011B2]
            font-medium
            mt-4
            text-[16px]
            sm:text-[18px]
            md:text-[20px]
            lg:text-[24px]
            leading-relaxed
            max-w-[780px]
            mx-auto
          "
        >
          Instantly estimate your monthly payments, home affordability, and
          <br className="hidden sm:block" />
          refinance savings.
        </p>
      </section>
    </div>
  );
}
