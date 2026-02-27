
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const StateAndRegulation = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="State Laws & Regulations" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
        Compliance With All State-Specific Requirements
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
      Mortgage rules vary from state to state, and HomyLoan follows all licensing, disclosure, and lending regulations required in each jurisdiction where we operate.
          </p>

          <h2 className="text-lg font-medium mb-4">
       Our compliance commitment includes:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Meeting state licensing requirements</li>
            <li>Providing required disclosures unique to each state</li>
            <li>Following local advertising and consumer protection laws</li>
            <li>Monitoring regulatory updates for each region</li>
          
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
        This ensures borrowers receive accurate, legally compliant service no matter where they live.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StateAndRegulation;
