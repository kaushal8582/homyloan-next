import React from "react";
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Ecoa = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="ECOA (Equal Credit Opportunity Act)" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
            Equal Treatment for Every Borrower
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
            At HomyLoan, we follow the Equal Credit Opportunity Act (ECOA),
            which ensures that every applicant is treated fairly during the loan
            process. We evaluate borrowers based only on financial
            qualifications, not on personal characteristics.
          </p>

          <h2 className="text-lg font-medium mb-4">
            We do not discriminate based on:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Race or color</li>
            <li>Religion</li>
            <li>National origin</li>
            <li>Sex or gender</li>
            <li>Marital status</li>
            <li>Age</li>
            <li>Disability</li>
            <li>Public assistance income</li>
            <li>The exercise of consumer protection rights</li>
          </ul>

          <p className="text-base md:text-lg text-gray-700">
            Our mission is to provide equal access to credit and a lending
            experience that is transparent, consistent, and free from bias.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ecoa;
