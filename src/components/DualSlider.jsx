import React, { useRef, useState } from "react";

export default function DualSlider() {
  const downRef = useRef(null);
  const rateRef = useRef(null);

  const [downPayment, setDownPayment] = useState(45); // %
  const [interestRate, setInterestRate] = useState(55); // %

  const startDrag = (e, ref, setValue) => {
    e.preventDefault();
    const move = (event) => {
      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      let percent = (x / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      setValue(percent);
    };

    move(e);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", move);
    });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-6">
      {/* Down Payment */}
      <div className="flex-1">
        <p className="text-sm font-medium mb-2">Down Payment</p>

        <div className="flex items-center gap-3">
          <div
            ref={downRef}
            onMouseDown={(e) => startDrag(e, downRef, setDownPayment)}
            className="relative flex-1 h-2 bg-[#E5E5E5] rounded-full cursor-pointer select-none"
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#E6FF4B] rounded-full"
              style={{ width: `${downPayment}%` }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full"
              style={{ left: `calc(${downPayment}% - 7px)` }}
            />
          </div>

          <div className="px-3 py-1.5 bg-[#F4F4F4] rounded-md text-sm">
            ${downPayment.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="flex-1">
        <p className="text-sm font-medium mb-2">Interest Rate</p>

        <div className="flex items-center gap-3">
          <div
            ref={rateRef}
            onMouseDown={(e) => startDrag(e, rateRef, setInterestRate)}
            className="relative flex-1 h-2 bg-[#E5E5E5] rounded-full cursor-pointer"
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#E6FF4B] rounded-full"
              style={{ width: `${interestRate}%` }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full"
              style={{ left: `calc(${interestRate}% - 7px)` }}
            />
          </div>

          <div className="px-3 py-1.5 bg-[#F4F4F4] rounded-md text-sm">
            {interestRate.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
