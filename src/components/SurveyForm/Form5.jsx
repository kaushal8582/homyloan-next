import React, { useState, useEffect } from 'react';
import WhyAskedDisclosure from './WhyAskedDisclosure';

const HomeLocationForm = ({ formData = {}, onNext, onDataChange, onValidityChange, stepNumber }) => {
  const [location, setLocation] = useState(formData.homeLocation ?? '');

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, homeLocation: location });
  }, [location]);

  const canProceed = () => !!(location ?? "").trim();

  useEffect(() => {
    onValidityChange?.(canProceed());
  }, [location]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      <div className="w-full sm:w-[750px] mb-2">
        <h1 className="text-[32px] sm:text-[45px] font-bold text-[#171A1F] leading-[60px] tracking-[-0.9px] mb-6">
          Where's the home located?
        </h1>
        <div className="w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-7 flex flex-col justify-center relative shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
          <label className="text-[16px] font-semibold text-[#171A1F]">Looking at homes & listings</label>
          <input
            type="text"
            placeholder="Home"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] outline-none"
          />
        </div>
        <WhyAskedDisclosure question="Why is this asked?" className="mt-4 opacity-80" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</WhyAskedDisclosure>
      </div>
    </div>
  );
};

export default HomeLocationForm;
