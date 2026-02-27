
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FairLeading = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Fair Lending" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
         Our Commitment to Equal and Inclusive Lending
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
        HomyLoan is dedicated to providing fair and equal lending opportunities to all individuals.

We follow all federal and state fair lending laws and actively work to eliminate barriers to credit.
          </p>

          <h2 className="text-lg font-medium mb-4">
         Our fair lending practices include:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Non-discriminatory policies</li>
            <li>Regular internal reviews and monitoring</li>
            <li>Equal pricing and loan terms based on creditworthiness</li>
            <li>Ethical decision-making across the lending process</li>
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
          Fair lending is a core part of our company culture and our promise to every borrower.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FairLeading;
