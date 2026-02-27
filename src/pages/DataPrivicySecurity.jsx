import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const DataPrivacySecurity = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Data Privacy & Security" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
            Your Information. Protected at Every Step.
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
            Protecting customer data is one of our highest priorities. HomyLoan
            uses advanced systems and strict protocols to safeguard sensitive
            information throughout the lending process.
          </p>

          <h2 className="text-lg font-medium mb-4">Our security measures include:</h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Data encryption</li>
            <li>Secure servers and storage systems</li>
            <li>Continuous monitoring for threats</li>
            <li>Restricted access to sensitive information</li>
          </ul>

          <p className="text-base md:text-lg text-gray-700">
           We collect only what is necessary to process your loan and never sell or misuse your data. Your privacy and security are always protected.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataPrivacySecurity;
