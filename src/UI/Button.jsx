"use client";

const Button = ({ label = "Buying", onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={` cursor-pointer group mt-12 w-[212px] h-[50px] rounded-[120px] bg-[#E6FF4B] 
      text-black font-semibold text-[20px] relative overflow-hidden 
      flex items-center justify-center transition-transform  duration-300 
      hover:text-white hover:font-bold hover:scale-110 ${className}`}
    >
      {/* TEXT */}
      <span className="relative z-20">{label}</span>

      {/* RIGHT TOP BIG DOT */}
      <span
        className="absolute -top-1 -right-1 w-7 h-7 bg-black rounded-full 
        transition-all duration-300 ease-out border-[4px] border-[#E6FF4B]
        group-hover:-top-2 group-hover:right-10 group-hover:w-20 group-hover:h-20 z-10"
      />

      {/* RIGHT TOP SMALL DOT */}
      <span
        className="absolute -top-2 right-5 w-6 h-6 bg-black rounded-full 
        transition-all duration-300 ease-out
        group-hover:top-5 group-hover:-right-2 group-hover:w-17 group-hover:h-17 z-7"
      />

      {/* LEFT BOTTOM BIG DOT */}
      <span
        className="absolute -bottom-4 -left-4 w-10 h-10 bg-black rounded-full 
        transition-all duration-300 ease-out
        group-hover:-top-2 group-hover:-left-0 group-hover:w-12 group-hover:h-12 z-10"
      />

      {/* LEFT BOTTOM SMALL DOT */}
      <span
        className="absolute -bottom-1 left-3 w-6 h-6 bg-black rounded-full 
        border-[4px] border-[#E6FF4B]
        transition-all duration-300 ease-out
        group-hover:bottom-- group-hover:left-10 group-hover:w-20 group-hover:h-20 z-10"
      />
    </button>
  );
};

export default Button;
