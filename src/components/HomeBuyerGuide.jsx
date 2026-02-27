import React from "react";
import { Download } from "lucide-react";

const defaultGuides = [
  {
    title: "HOMEBUYER'S GUIDE",
    desc: "The Do's and Don'ts guide helps ensure your credit and qualifications stay unchanged during loan processing, protecting your home loan approval.",
    downloadFile: "",
  },
  {
    title: "FREE CHECKLISTS",
    desc: "Join a team of visionary architects and designers who inspire, challenge, and support each other to create extraordinary spaces.",
    downloadFile: "",
  },
  {
    title: "6 STEPS TO HOMEOWNERSHIP",
    desc: "Homy Loans makes home buying simple, guiding you from application to closing and beyond.",
    downloadFile: "",
  },
  {
    title: "HOMEOWNERSHIP BENEFITS",
    desc: "Homy Loans helps families achieve homeownership, an exciting milestone with lasting financial and personal benefits.",
    downloadFile: "",
  },
];

const HomeBuyerGuide = ({ content }) => {
  const heading = content?.heading || "HOMEBUYER'S GUIDE";
  const guides = content?.guides || defaultGuides;

  const handleDownload = (downloadFile, title) => {
    if (downloadFile) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadFile;
      link.download = title || 'guide';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 sm:mb-10 md:mb-12 lg:mb-16 uppercase">
        {heading}
      </h2>

      {/* Cards */}
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {guides.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 gap-4 sm:gap-6 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
          >
            {/* Left Text */}
            <div className="max-w-3xl">
              <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1 sm:mb-1.5">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Download Button */}
            <button 
              onClick={() => handleDownload(item.downloadFile, item.title)}
              disabled={!item.downloadFile}
              className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 self-end sm:self-auto ${
                item.downloadFile 
                  ? "bg-black cursor-pointer hover:opacity-80" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Download className={`w-4 h-4 sm:w-5 sm:h-5 ${item.downloadFile ? "text-white" : "text-gray-500"}`} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBuyerGuide;
