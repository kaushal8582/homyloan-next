
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Advertisement = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Advertising & Marketing Compliance" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
          Honest, Transparent, and Accurate Messaging
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
          All HomyLoan advertising and marketing materials follow federal and state regulations. Our communication is designed to be clear, truthful, and helpful—not misleading.
          </p>

          <h2 className="text-lg font-medium mb-4">
         Our standards include:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Accurate representation of rates, terms, and loan options</li>
            <li>Required disclosures included in all ads</li>
            <li>No deceptive or exaggerated claims</li>
            <li>Full compliance with mortgage advertising laws</li>
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
           We aim to educate borrowers, set clear expectations, and promote trust through transparency.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Advertisement;
