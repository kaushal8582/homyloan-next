import React from "react";
import ContentText from "./ContentText";

const HomyLoan = ({ content }) => {
  const heading = content?.heading || "Homy Loans";
  const description = content?.description || "At Homy Loans, our mission is to approach every aspect of our business from the inside-out. By focusing on our loan originators and support staff first, we ensure an exceptional experience for every customer. Founded on the principle of \"Be Human,\" our culture prioritizes care for people—both our team and the homeowners we serve.";

  return (
    <section className="w-full bg-white py-16 px-6 md:px-14 lg:px-20">
      <div className="max-w-5xl mx-auto text-center px-6 sm:px-10 py-8">
        <ContentText tag="h2" text={heading} className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black uppercase" />

        <ContentText tag="p" text={description} className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed" />
      </div>
    </section>
  );
};

export default HomyLoan;
