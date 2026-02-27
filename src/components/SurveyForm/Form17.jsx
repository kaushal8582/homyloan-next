import React from 'react';

const CreditCheckIntro = ({ formData = {}, onNext }) => {
  return (
    /* Frame 1171275652 - Main Wrapper */
    <div className="flex flex-col justify-center items-center p-4 sm:p-10 max-w-4xl mx-auto">
      <div className="w-full sm:w-[750px] min-h-[366px] flex flex-col gap-[20px]">
      {/* Subtract / Illustration Placeholder Section */}
      

      {/* Frame 1171275640 - Text Content */}
      <div className="flex flex-col items-start p-0 gap-[36px] w-full self-stretch">
        
        {/* Frame 1171275639 - Typography Wrapper */}
        <div className="flex flex-col items-start p-0 gap-[16px] w-full self-stretch">
          
          {/* Title: Next, let's create your account... */}
          <h1 className="
            w-full h-auto sm:h-[180px] 
            text-[#171A1F] 
            text-[32px] sm:text-[45px] 
            font-bold 
            leading-[45px] sm:leading-[60px] 
            tracking-[-0.9px]
            self-stretch
          ">
            Next, let's create your account and do a soft credit check.
          </h1>

          {/* Subtitle: Select the timeframe... */}
          <p className="
            w-full h-auto sm:h-[102px] 
            text-[#565D6D] 
            text-[18px] 
            font-normal 
            leading-[34px] 
            self-stretch
          ">
            1. Won't affect your credit score <br></br>
2. Calculates your approval amount <br/>
3. Almost there - one of the last steps <br/>
          </p>
          
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreditCheckIntro;