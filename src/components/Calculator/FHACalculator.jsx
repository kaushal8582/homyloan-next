import React, { useRef, useState, useEffect } from "react";

const FHACalculator = () => {
  const [_showExtraPayments, _setShowExtraPayments] = useState(false);
  const sliderRef = useRef(null);

  const [homeValue, setHomeValue] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [renovationCostMode, setRenovationCostMode] = useState("%"); // "$" or "%"
  const [renovationCostPercent, setRenovationCostPercent] = useState(20); // percentage value
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4500);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaDues, setHoaDues] = useState(0);
  const [_extraPayment, _setExtraPayment] = useState(0);
  const [_startDate, _setStartDate] = useState("May 2024");
  const [isLoaded, setIsLoaded] = useState(false);

  const [calculations, setCalculations] = useState({
    loanAmount: 360000,
    monthlyPI: 2450,
    monthlyInterest: 2250,
    totalInterest: 548034,
    originationFee: 3600,
    monthlyMI: 240,
    totalMI: 86400,
    totalMonthly: 3065,
    payoffDate: "May 2054",
    cashToClose: 98500,
    downPaymentPercent: 20,
    ltv: 80,
    dti: 28,
    roi: 0,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("fhaCalculatorState");
      if (savedState) {
        const parsed = JSON.parse(savedState);

        if (parsed.homeValue !== undefined) setHomeValue(parsed.homeValue);
        if (parsed.downPayment !== undefined)
          setDownPayment(parsed.downPayment);
        if (parsed.renovationCostMode !== undefined)
          setRenovationCostMode(parsed.renovationCostMode);
        if (parsed.renovationCostPercent !== undefined)
          setRenovationCostPercent(parsed.renovationCostPercent);
        if (parsed.interestRate !== undefined)
          setInterestRate(parsed.interestRate);
        if (parsed.loanTerm !== undefined) setLoanTerm(parsed.loanTerm);
        if (parsed.propertyTax !== undefined)
          setPropertyTax(parsed.propertyTax);
        if (parsed.homeInsurance !== undefined)
          setHomeInsurance(parsed.homeInsurance);
        if (parsed.hoaDues !== undefined) setHoaDues(parsed.hoaDues);
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever any value changes (only after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    try {
      const stateToSave = {
        homeValue,
        downPayment,
        renovationCostMode,
        renovationCostPercent,
        interestRate,
        loanTerm,
        propertyTax,
        homeInsurance,
        hoaDues,
      };
      localStorage.setItem("fhaCalculatorState", JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [
    homeValue,
    downPayment,
    renovationCostMode,
    renovationCostPercent,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    isLoaded,
  ]);

  useEffect(() => {
    const loanAmount = homeValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPI = loanAmount / numberOfPayments;
    }

    const monthlyInterest = loanAmount * monthlyRate;
    const totalPayments = monthlyPI * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;

    // FHA specific: Origination fee (typically 1%)
    const originationFee = loanAmount * 0.01;

    // FHA Mortgage Insurance (0.85% annual for loans > 95% LTV, 0.80% for < 95%)
    const ltv = (loanAmount / homeValue) * 100;
    const annualMIRate = ltv > 95 ? 0.0085 : 0.008;
    const monthlyMI = (loanAmount * annualMIRate) / 12;
    const totalMI = monthlyMI * numberOfPayments;

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaDues;

    const totalMonthly =
      monthlyPI + monthlyTax + monthlyInsurance + monthlyMI + monthlyHOA;

    const today = new Date();
    const payoffDate = new Date(
      today.setMonth(today.getMonth() + numberOfPayments),
    );
    const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const closingCosts = homeValue * 0.03;
    const cashToClose = downPayment + closingCosts + originationFee;

    const downPaymentPercent = ((downPayment / homeValue) * 100).toFixed(0);

    // DTI estimation (assuming monthly payment is 28% of income)
    const dti = 28; // Placeholder

    // ROI calculation (simplified)
    const roi = 0;

    setCalculations({
      loanAmount,
      monthlyPI,
      monthlyInterest,
      totalInterest,
      originationFee,
      monthlyMI,
      totalMI,
      totalMonthly,
      payoffDate: payoffDateStr,
      cashToClose,
      downPaymentPercent,
      ltv,
      dti,
      roi,
    });
  }, [
    homeValue,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
  ]);

  const startDrag = (e) => {
    e.preventDefault();
    const move = (event) => {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      let percent = (x / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      // INVERTED: Drag right = lower down payment = higher loan amount
      const newDownPayment = Math.round((homeValue * (100 - percent)) / 100);
      setDownPayment(newDownPayment);
    };

    move(e);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", move);
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCurrencyInput = (value, setter) => {
    const numValue = parseFloat(value.replace(/,/g, "")) || 0;
    setter(numValue);
  };

  // Sync renovation cost when mode changes to % (only after load and when user switches mode)
  useEffect(() => {
    if (!isLoaded) return;

    if (renovationCostMode === "%") {
      const calculatedCost = Math.round(
        (homeValue * renovationCostPercent) / 100,
      );
      if (Math.abs(calculatedCost - downPayment) > 1) {
        setDownPayment(calculatedCost);
      }
    }
  }, [renovationCostMode, renovationCostPercent, homeValue, isLoaded]);

  // Sync percentage when dollar amount changes in $ mode (only after load)
  useEffect(() => {
    if (!isLoaded) return;

    if (renovationCostMode === "$") {
      const calculatedPercent = ((downPayment / homeValue) * 100).toFixed(1);
      const newPercent = parseFloat(calculatedPercent);
      if (Math.abs(newPercent - renovationCostPercent) > 0.1) {
        setRenovationCostPercent(newPercent);
      }
    }
  }, [downPayment, homeValue, renovationCostMode, isLoaded]);

  // INVERTED: Display shows inverted percentage (100 - actual down payment %)
  const displayDownPaymentPercent = 100 - (downPayment / homeValue) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/house.svg"
                alt="House"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <h2 className="text-xl sm:text-2xl font-semibold">
                Property & Loan Details
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-500">
              Enter the purchase price and loan terms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-base font-medium mb-2">
                Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(homeValue)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHomeValue)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Renovation Cost
              </label>
              <div className="relative bg-white border border-[#e4e2dd] rounded-[14px] h-[46px] overflow-hidden">
                {/* Input Field */}
                <div className="absolute left-0 top-0 h-[46px] w-[calc(100%-85px)]">
                  <input
                    type="text"
                    value={
                      renovationCostMode === "$"
                        ? formatCurrency(downPayment)
                        : renovationCostPercent.toFixed(1)
                    }
                    onChange={(e) => {
                      if (renovationCostMode === "$") {
                        handleCurrencyInput(e.target.value, setDownPayment);
                      } else {
                        const value = parseFloat(e.target.value) || 0;
                        setRenovationCostPercent(
                          Math.min(100, Math.max(0, value)),
                        );
                      }
                    }}
                    className="w-full h-full px-3 pr-12 border-0 bg-transparent text-[14px] text-[#25231d] focus:outline-none"
                    placeholder={renovationCostMode === "$" ? "0" : "0.0"}
                  />
                  {renovationCostMode === "%" && (
                    <span className="absolute right-[0px] top-1/2 -translate-y-1/2 text-[16px] text-[rgba(16,16,17,0.6)] font-medium">
                      %
                    </span>
                  )}
                  {renovationCostMode === "$" && (
                    <span className="absolute right-[0px] top-1/2 -translate-y-1/2 text-[16px] text-[rgba(16,16,17,0.6)] font-medium">
                      $
                    </span>
                  )}
                </div>

                {/* Toggle Buttons Container */}
                <div className="absolute right-0 top-0 h-[46px] w-[82px] bg-[rgba(246,245,243,0.5)] border-l border-[#e4e2dd] flex items-center">
                  {/* Vertical Divider Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e4e2dd]"></div>

                  {/* Dollar Button */}
                  <button
                    onClick={() => setRenovationCostMode("$")}
                    className={`h-[38px] w-[32px] ml-[5px] rounded-[12px] flex items-center justify-center transition-all ${
                      renovationCostMode === "$"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        renovationCostMode === "$"
                          ? "text-[#25231d]"
                          : "text-[rgba(16,16,17,0.6)]"
                      }`}
                    >
                      $
                    </span>
                  </button>

                  {/* Percentage Button */}
                  <button
                    onClick={() => setRenovationCostMode("%")}
                    className={`h-[38px] w-[37px] ml-[3px] rounded-[12px] flex items-center justify-center transition-all ${
                      renovationCostMode === "%"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        renovationCostMode === "%"
                          ? "text-[#25231d]"
                          : "text-[rgba(16,16,17,0.6)]"
                      }`}
                    >
                      %
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-medium text-gray-600">
                  Loan Amount
                </span>
                <span className="text-2xl font-bold">
                  ${formatCurrency(calculations.loanAmount)}
                </span>
              </div>

              <div
                ref={sliderRef}
                onMouseDown={startDrag}
                className="relative w-full h-2 bg-[#E5E5E5] rounded-full cursor-pointer select-none"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#E6FF4B] rounded-full"
                  style={{ width: `${displayDownPaymentPercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full"
                  style={{ left: `calc(${displayDownPaymentPercent}% - 7px)` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base font-medium mb-2">
                After Repaired Value
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Length of Loan
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base font-medium mb-2">
                After Repaired Value
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Annual Property Taxes
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base font-medium mb-2">
                Annual Insurance
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Purchase Price LTV
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-[#FFFFFF] p-6 rounded-3xl my-5">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/tax.svg"
              alt="Tax"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <h3 className="text-xl font-semibold">Taxes & Insurance</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            Estimated monthly or yearly expenses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium mb-2">
                Origination Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(propertyTax)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setPropertyTax)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Annual Utilities
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(homeInsurance)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHomeInsurance)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-base font-medium mb-2">
                Cost To Sell
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(hoaDues)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setHoaDues)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8 bg-[#FFFFFF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src="/pie.svg"
                alt="House"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <h2 className="text-base sm:text-lg font-semibold">
                Deal Breakdown
              </h2>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Based on ${formatCurrency(homeValue)} home value
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C0EE2B]"></span>
                <span className="text-xs">Current Loan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.loanAmount)}
                </span>
                <span className="font-semibold text-xs text-gray-500 text-right">
                  {calculations.ltv.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4169E1]"></span>
                <span className="text-xs">Down Payment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(downPayment)}
                </span>
                <span className="font-semibold text-xs text-gray-500 text-right">
                  {calculations.downPaymentPercent}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
                <span className="text-xs">Monthly Interest Payment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.monthlyInterest)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4169E1]"></span>
                <span className="text-xs">Total Interest Over Term</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.totalInterest)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                <span className="text-xs">Origination Fee Amount</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.originationFee)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                <span className="text-xs">Monthly MI</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.monthlyMI)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300 flex items-center justify-between">
            <p className="text-xs text-gray-400 flex items-center">
              <img
                src="/info.svg"
                alt="Info"
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              />
              Estimates only
            </p>
            <p className="text-xs text-gray-400">Updated just now</p>
          </div>
        </div>

        <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8 bg-[#FFFFFF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src="/pie.svg"
                alt="House"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <h2 className="text-base sm:text-lg font-semibold">
                Deal Metrics
              </h2>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-6">Key financial indicators</p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs block">Loan-to-Value (LTV)</span>
                <p className="text-xs text-gray-400">
                  Loan amount / Home value
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-sm">
                  {calculations.ltv.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs block">Debt-to-Income (DTI)</span>
                <p className="text-xs text-gray-400">
                  Monthly payment / Income
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-sm">
                  {calculations.dti}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs block">Total MI Over Term</span>
                <p className="text-xs text-gray-400">FHA mortgage insurance</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.totalMI)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs block">Monthly Payment (PITI+MI)</span>
                <p className="text-xs text-gray-400">Including all costs</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-sm">
                  ${formatCurrency(calculations.totalMonthly)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300 flex items-center justify-between">
            <p className="text-xs text-gray-400 flex items-center">
              <img
                src="/info.svg"
                alt="Info"
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              />
              Estimates only
            </p>
            <p className="text-xs text-gray-400">Updated just now</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Loan Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Loan Amount</span>
              <span className="font-semibold text-sm">
                ${formatCurrency(calculations.loanAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-xs text-gray-600">Down Payment</span>
                <span className="text-xs text-gray-500 block">
                  ({calculations.downPaymentPercent}%)
                </span>
              </div>
              <span className="font-semibold text-sm">
                ${formatCurrency(downPayment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Total Interest Paid</span>
              <span className="font-semibold text-sm">
                ${formatCurrency(calculations.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Est. Payoff Date</span>
              <span className="font-semibold text-sm">
                {calculations.payoffDate}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-300">
              <span className="text-base font-semibold">Cash to Close</span>
              <span className="text-xl font-bold text-[#C0EE2B]">
                ${formatCurrency(calculations.cashToClose)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FHACalculator;
