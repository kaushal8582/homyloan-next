import React, { useRef, useState, useEffect } from "react";

const STORAGE_KEY = "va-loan-calculator";

const VaPurchaseCalculator = () => {
  const [showExtraPayments, setShowExtraPayments] = useState(false);
  const sliderRef = useRef(null);
  const hasLoaded = useRef(false);
  const didMount = useRef(false);

  const [homeValue, setHomeValue] = useState(450000);
  const [currentBalance, setCurrentBalance] = useState(360000);
  const [refinanceCostsMode, setRefinanceCostsMode] = useState("%"); // "$" or "%"
  const [refinanceCostsPercent, setRefinanceCostsPercent] = useState(80); // percentage value
  const [currentRate, setCurrentRate] = useState(8.5);
  const [yearsLeft, setYearsLeft] = useState(28);
  const [newRate, setNewRate] = useState(6.5);
  const [newTerm, setNewTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4500);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaDues, setHoaDues] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const [calculations, setCalculations] = useState({
    currentMonthly: 0,
    newMonthly: 0,
    savings: 0,
    savingsPercent: 0,
    currentInterest: 0,
    newInterest: 0,
    interestSavings: 0,
    loanAmount: 360000,
    downPayment: 90000,
    totalInterest: 0,
    payoffDate: "May 2054",
    cashToClose: 0,
    downPaymentPercent: 20,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const d = JSON.parse(saved);

      setHomeValue(d.homeValue ?? 450000);
      setCurrentBalance(d.currentBalance ?? 360000);
      setRefinanceCostsMode(d.refinanceCostsMode ?? "%");
      setRefinanceCostsPercent(d.refinanceCostsPercent ?? 80);
      setCurrentRate(d.currentRate ?? 8.5);
      setYearsLeft(d.yearsLeft ?? 28);
      setNewRate(d.newRate ?? 6.5);
      setNewTerm(d.newTerm ?? 30);
      setPropertyTax(d.propertyTax ?? 4500);
      setHomeInsurance(d.homeInsurance ?? 1200);
      setHoaDues(d.hoaDues ?? 0);
      setPmi(d.pmi ?? 0);
      setExtraPayment(d.extraPayment ?? 0);
      setStartDate(d.startDate ?? new Date().toISOString().slice(0, 7));
    }

    hasLoaded.current = true;
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!hasLoaded.current) return;

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        homeValue,
        currentBalance,
        refinanceCostsMode,
        refinanceCostsPercent,
        currentRate,
        yearsLeft,
        newRate,
        newTerm,
        propertyTax,
        homeInsurance,
        hoaDues,
        pmi,
        extraPayment,
        startDate,
      }),
    );
  }, [
    homeValue,
    currentBalance,
    refinanceCostsMode,
    refinanceCostsPercent,
    currentRate,
    yearsLeft,
    newRate,
    newTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    pmi,
    extraPayment,
    startDate,
  ]);

  useEffect(() => {
    const currentMonthlyRate = currentRate / 100 / 12;
    const currentPaymentsLeft = yearsLeft * 12;

    let currentMonthlyPI = 0;
    if (currentMonthlyRate > 0) {
      currentMonthlyPI =
        (currentBalance *
          (currentMonthlyRate *
            Math.pow(1 + currentMonthlyRate, currentPaymentsLeft))) /
        (Math.pow(1 + currentMonthlyRate, currentPaymentsLeft) - 1);
    } else {
      currentMonthlyPI = currentBalance / currentPaymentsLeft;
    }

    const currentTotalPayments = currentMonthlyPI * currentPaymentsLeft;
    const currentInterest = currentTotalPayments - currentBalance;

    const newMonthlyRate = newRate / 100 / 12;
    const newNumberOfPayments = newTerm * 12;

    let newMonthlyPI = 0;
    if (newMonthlyRate > 0) {
      newMonthlyPI =
        (currentBalance *
          (newMonthlyRate *
            Math.pow(1 + newMonthlyRate, newNumberOfPayments))) /
        (Math.pow(1 + newMonthlyRate, newNumberOfPayments) - 1);
    } else {
      newMonthlyPI = currentBalance / newNumberOfPayments;
    }

    const newTotalPayments = newMonthlyPI * newNumberOfPayments;
    const newInterest = newTotalPayments - currentBalance;

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = pmi / 12;
    const monthlyHOA = hoaDues;

    const currentTotalMonthly =
      currentMonthlyPI +
      monthlyTax +
      monthlyInsurance +
      monthlyPMI +
      monthlyHOA;
    const newTotalMonthly =
      newMonthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    const monthlySavings = currentTotalMonthly - newTotalMonthly;
    const savingsPercent =
      currentTotalMonthly > 0
        ? (monthlySavings / currentTotalMonthly) * 100
        : 0;

    const interestSavings = currentInterest - newInterest;

    const today = new Date();
    const payoffDate = new Date(
      today.setMonth(today.getMonth() + newNumberOfPayments),
    );
    const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const closingCosts = currentBalance * 0.02;
    const cashToClose = closingCosts;

    const downPayment = homeValue - currentBalance;
    const downPaymentPercent = ((downPayment / homeValue) * 100).toFixed(0);

    setCalculations({
      currentMonthly: currentTotalMonthly,
      newMonthly: newTotalMonthly,
      savings: monthlySavings,
      savingsPercent,
      currentInterest,
      newInterest,
      interestSavings,
      loanAmount: currentBalance,
      downPayment,
      totalInterest: newInterest,
      payoffDate: payoffDateStr,
      cashToClose,
      downPaymentPercent,
    });
  }, [
    homeValue,
    currentBalance,
    currentRate,
    yearsLeft,
    newRate,
    newTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    pmi,
  ]);

  const startDrag = (e) => {
    e.preventDefault();

    const move = (event) => {
      const clientX = event.touches?.[0]?.clientX ?? event.clientX;

      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;

      let percent = (x / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      const newBalance = Math.round((homeValue * percent) / 100);
      setCurrentBalance(newBalance);
    };

    move(e);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", stop);

    function stop() {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    }
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

  // Sync refinance costs when mode changes to %
  useEffect(() => {
    if (refinanceCostsMode === "%") {
      const calculatedCosts = Math.round(
        (homeValue * refinanceCostsPercent) / 100,
      );
      if (calculatedCosts !== currentBalance) {
        setCurrentBalance(calculatedCosts);
      }
    }
  }, [refinanceCostsMode, refinanceCostsPercent, homeValue]);

  // Sync percentage when dollar amount changes in $ mode
  useEffect(() => {
    if (refinanceCostsMode === "$") {
      const calculatedPercent = ((currentBalance / homeValue) * 100).toFixed(1);
      const newPercent = parseFloat(calculatedPercent);
      if (Math.abs(newPercent - refinanceCostsPercent) > 0.1) {
        setRefinanceCostsPercent(newPercent);
      }
    }
  }, [currentBalance, homeValue, refinanceCostsMode]);

  const balancePercent = (currentBalance / homeValue) * 100;

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
              <h2 className="text-lg sm:text-xl font-semibold">
                Property & Loan Details
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Enter the purchase price and loan terms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Preference
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
              <label className="block text-sm font-medium mb-2">
                Paying Refinance Costs
              </label>
              <div className="relative bg-white border border-[#e4e2dd] rounded-[14px] h-[46px] overflow-hidden">
                {/* Input Field */}
                <div className="absolute left-0 top-0 h-[46px] w-[calc(100%-85px)]">
                  <input
                    type="text"
                    value={
                      refinanceCostsMode === "$"
                        ? formatCurrency(currentBalance)
                        : refinanceCostsPercent.toFixed(1)
                    }
                    onChange={(e) => {
                      if (refinanceCostsMode === "$") {
                        handleCurrencyInput(e.target.value, setCurrentBalance);
                      } else {
                        const value = parseFloat(e.target.value) || 0;
                        setRefinanceCostsPercent(
                          Math.min(100, Math.max(0, value)),
                        );
                      }
                    }}
                    className="w-full h-full px-3 pr-12 border-0 bg-transparent text-[14px] text-[#25231d] focus:outline-none"
                    placeholder={refinanceCostsMode === "$" ? "0" : "0.0"}
                  />
                  {refinanceCostsMode === "%" && (
                    <span className="absolute right-[0px] top-1/2 -translate-y-1/2 text-[16px] text-[rgba(16,16,17,0.6)] font-medium">
                      %
                    </span>
                  )}
                  {refinanceCostsMode === "$" && (
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
                    onClick={() => setRefinanceCostsMode("$")}
                    className={`h-[38px] w-[32px] ml-[5px] rounded-[12px] flex items-center justify-center transition-all ${
                      refinanceCostsMode === "$"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        refinanceCostsMode === "$"
                          ? "text-[#25231d]"
                          : "text-[rgba(16,16,17,0.6)]"
                      }`}
                    >
                      $
                    </span>
                  </button>

                  {/* Percentage Button */}
                  <button
                    onClick={() => setRefinanceCostsMode("%")}
                    className={`h-[38px] w-[37px] ml-[3px] rounded-[12px] flex items-center justify-center transition-all ${
                      refinanceCostsMode === "%"
                        ? "bg-white border border-black shadow-[0px_0px_0px_0px_rgba(23,26,31,0),0px_2px_4px_0px_rgba(0,0,0,0.08)]"
                        : "bg-transparent border-0"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-medium leading-[20px] ${
                        refinanceCostsMode === "%"
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
                <span className="text-sm font-medium text-gray-600">
                  Loan Amount
                </span>
                <span className="text-xl font-bold">
                  ${formatCurrency(currentBalance)}
                </span>
              </div>

              <div
                ref={sliderRef}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                className="relative w-full h-2 bg-[#E5E5E5] rounded-full cursor-pointer select-none"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#E6FF4B] rounded-full"
                  style={{ width: `${balancePercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full"
                  style={{ left: `calc(${balancePercent}% - 7px)` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Original Loan Amount
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
              <label className="block text-sm font-medium mb-2">
                Current Loan Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formatCurrency(currentBalance)}
                  onChange={(e) =>
                    handleCurrencyInput(e.target.value, setCurrentBalance)
                  }
                  className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Start Date
                </label>
                <input
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Original Loan Term
                </label>
                <select
                  value={yearsLeft}
                  onChange={(e) => setYearsLeft(parseInt(e.target.value))}
                  className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
                >
                  {[...Array(30)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} years
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="pt-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatCurrency(currentBalance)}
                    onChange={(e) =>
                      handleCurrencyInput(e.target.value, setCurrentBalance)
                    }
                    className="w-full h-12 pl-7 pr-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  New Loan Rate %
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newRate}
                    onChange={(e) =>
                      setNewRate(parseFloat(e.target.value) || 0)
                    }
                    className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
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
            <h3 className="text-lg font-semibold">Additional Details</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Estimated monthly or yearly expenses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                New Loan Term
              </label>
              <select
                value={newTerm}
                onChange={(e) => setNewTerm(parseInt(e.target.value))}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent appearance-none bg-white"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
                <option value={10}>10 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                New Loan Start Date
              </label>
              <input
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Refinance Costs
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Original Rate %
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentRate}
                  onChange={(e) =>
                    setCurrentRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-12 pr-7 pl-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E6FF4B] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
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
              <h2 className="text-lg sm:text-xl font-semibold">
                Monthly Payment Comparison
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Based on ${formatCurrency(homeValue)} home value
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E6FF4B]"></span>
                <span className="text-sm">Current Loan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(calculations.currentMonthly)}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {currentRate.toFixed(1)}% APR
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4169E1]"></span>
                <span className="text-sm">New Loan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(calculations.newMonthly)}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {newRate.toFixed(1)}% APR
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
                <span className="text-sm">Monthly Payment Difference</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(Math.abs(calculations.savings))}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {calculations.savingsPercent.toFixed(1)}%
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
              <h2 className="text-lg sm:text-xl font-semibold">
                Total Interest Comparison
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Over the life of the loan
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E6FF4B]"></span>
                <span className="text-sm">Current Loan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(calculations.currentInterest)}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {yearsLeft} years left
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4169E1]"></span>
                <span className="text-sm">New Loan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(calculations.newInterest)}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {newTerm} years
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
                <span className="text-sm">Interest Savings</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  ${formatCurrency(Math.abs(calculations.interestSavings))}
                </span>
                <span className="font-semibold text-sm text-gray-500 text-right">
                  {calculations.interestSavings > 0 ? "saved" : "more"}
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
          <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loan Amount</span>
              <span className="font-semibold">
                ${formatCurrency(calculations.loanAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-600">Down Payment</span>
                <span className="text-xs text-gray-500 block">
                  ({calculations.downPaymentPercent}%)
                </span>
              </div>
              <span className="font-semibold">
                ${formatCurrency(calculations.downPayment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Interest Paid</span>
              <span className="font-semibold">
                ${formatCurrency(calculations.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Est. Payoff Date</span>
              <span className="font-semibold">{calculations.payoffDate}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-300">
              <span className="text-base font-semibold">Cash to Close</span>
              <span className="text-2xl font-bold text-[#C0EE2B]">
                ${formatCurrency(calculations.cashToClose)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaPurchaseCalculator;
