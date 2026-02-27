
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const DoddFrank = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Dodd-Frank Act Compliance" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
           Protecting Borrowers Through Responsible Lending
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
           The Dodd-Frank Act strengthens consumer protections in the financial and mortgage industries. HomyLoan adheres to all Dodd-Frank requirements and ensures responsible, transparent lending.
          </p>

          <h2 className="text-lg font-medium mb-4">
          Our compliance includes:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Clear disclosure of rates, fees, and loan terms</li>
            <li>Ability-to-Repay (ATR) evaluations</li>
            <li>Avoiding unfair, deceptive, or abusive practices</li>
            <li>Safe, ethical, and accountable lending standards</li>
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
           These protections guide our operations and ensure borrowers receive accurate information and fair treatment.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoddFrank;
