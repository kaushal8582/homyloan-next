import React from 'react';

const MainWrapper = ({ children }) => {
  return (
    <div className="flex items-start justify-center w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Rectangle 34624889 */}
      <div 
        className="
          relative 
          w-full 
          max-w-[872px] 
          min-h-[400px] 
          
          bg-[#FFFFFF] 
          rounded-[12px] 
          sm:rounded-[16px] 
          md:rounded-[18px] 
          lg:rounded-[20px] 
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
        "
        style={{
          // Combined Box Shadow and Inset Shadow as per specs
          boxShadow: `
            0px 4px 8.4px rgba(0, 0, 0, 0.16), 
            inset 0px 9px 12.5px rgba(0, 0, 0, 0.12)
          `
        }}
      >
        {/* Iske andar aapke previous steps (Contact Info, Address, etc.) aayenge */}
        <div className="w-full h-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-[21px] xl:px-[61px] py-6 sm:py-10 md:py-14 lg:py-20 xl:py-[91px] gap-4 sm:gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;