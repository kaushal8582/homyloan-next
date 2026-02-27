
import VideoHeading from "../Components/VideoHeading";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const TraningAndEducation = () => {
  return (
    <div>
      <Navbar />
      <VideoHeading title="Training & Education" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
        Continuous Learning for Better Service and Compliance
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6">
       Our team receives ongoing training to stay current with federal, state, and industry-specific requirements.
This ensures that every customer interaction meets legal and ethical standards.
          </p>

          <h2 className="text-lg font-medium mb-4">
        Our training covers:
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
            <li>Fair lending and anti-discrimination</li>
            <li>Consumer privacy laws</li>
            <li>Ethical sales practices</li>
            <li>Fraud prevention and detection</li>
            <li>Regulatory updates</li>
            
          </ul>

          <p className="text-base md:text-lg text-gray-700">
         Through continuous education, we deliver a professional, compliant, and customer-focused lending experience.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TraningAndEducation;
