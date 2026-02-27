
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FairHousingAct = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Fair Housing Act" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
           Equal Access to Homeownership
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
           HomyLoan fully complies with the Fair Housing Act, which prohibits discrimination in any housing-related transaction, including mortgage lending.
          </p>

          <h2 className="text-lg font-medium mb-4">
           We ensure that:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Every borrower receives equal opportunity</li>
            <li>No applicant is discouraged, steered, or treated differently</li>
            <li>Our communication remains unbiased and respectful</li>
            <li>All decisions are based solely on financial qualifications</li>
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
           We are committed to promoting fair, inclusive access to mortgage financing for every individual and family.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FairHousingAct;
