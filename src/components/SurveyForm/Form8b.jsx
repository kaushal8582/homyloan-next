import React, { useState, useEffect, useRef } from 'react';
import WhyAskedDisclosure from './WhyAskedDisclosure';
import { getAutocompletePredictions, getPlaceDetails } from '../../services/googleApi';

const AddressFormStep = ({ formData = {}, onNext, onDataChange, onValidityChange, stepNumber }) => {
  const [address, setAddress] = useState({
    street: formData.street ?? '',
    apt: formData.apt ?? '',
    city: formData.city ?? '',
    state: formData.state ?? '',
    zip: formData.zip ?? '',
  });

  const [autocompleteInput, setAutocompleteInput] = useState(formData.street ?? '');
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const debounceTimerRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Sync autocompleteInput with address.street when address changes externally
  useEffect(() => {
    if (address.street && !autocompleteInput) {
      setAutocompleteInput(address.street);
    }
  }, [address.street]);

  // Pre-fill zip from formData.zip if available and zip is empty
  useEffect(() => {
    if (formData.zip && !address.zip) {
      setAddress((prev) => ({ ...prev, zip: formData.zip }));
    }
  }, [formData.zip]);

  useEffect(() => {
    if (onDataChange) onDataChange({ ...formData, ...address });
  }, [address]);

  const update = (key, value) => setAddress((prev) => ({ ...prev, [key]: value }));

  // Handle autocomplete input with debouncing
  const handleAutocompleteInput = async (value) => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!value || value.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoadingPredictions(true);
    
    // Debounce API calls
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await getAutocompletePredictions(value);
        setPredictions(results);
        setShowPredictions(results.length > 0);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
        setShowPredictions(false);
      } finally {
        setIsLoadingPredictions(false);
      }
    }, 300);
  };

  // Handle prediction selection
  const handleSelectPrediction = async (prediction) => {
    setShowPredictions(false);
    setPredictions([]);

    try {
      const placeDetails = await getPlaceDetails(prediction.placeId);
      if (placeDetails) {
        setAddress({
          street: placeDetails.street || '',
          apt: placeDetails.apt || '',
          city: placeDetails.city || '',
          state: placeDetails.state || '',
          zip: placeDetails.zip || '',
        });
        setAutocompleteInput(placeDetails.street || prediction.description);
      } else {
        setAutocompleteInput(prediction.description);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setAutocompleteInput(prediction.description);
    }
  };

  // Close predictions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowPredictions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const canProceed = () =>
    !!(address.street?.trim() && address.city?.trim() && address.state?.trim() && address.zip?.trim());

  useEffect(() => {
    onValidityChange?.(canProceed());
  }, [address]);

  return (
    <div className="flex flex-col items-start p-4 sm:p-10  max-w-4xl mx-auto ">
      <div className="w-full sm:w-[750px] mb-2">
        <div className="mb-8">
          <h2 className="text-[25px] font-semibold text-black leading-[34px]">What's your current address</h2>
          {/* <WhyAskedDisclosure
            question="What if I pay to live somewhere but I'm not on a lease?"
            variant="muted"
            className="opacity-70 mt-3"
          /> */}
          <p className="text-[16px] text-[#A1A1A1] font-medium mt-2">
            We use this info to help verify your identity – don't worry, it won't affect anything related to your buying plans.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div ref={autocompleteRef} className="relative w-full">
            <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
              <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Street Address</label>
              <input
                type="text"
                placeholder="Start typing your address..."
                value={autocompleteInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setAutocompleteInput(value);
                  update('street', value);
                  handleAutocompleteInput(value);
                }}
                onFocus={() => {
                  if (predictions.length > 0) {
                    setShowPredictions(true);
                  }
                }}
                className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
              />
            </div>
            {showPredictions && (
              <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#DEE1E6] rounded-[16px] shadow-lg max-h-[300px] overflow-y-auto">
                {isLoadingPredictions ? (
                  <div className="p-4 text-center text-[#A1A1A1]">Loading...</div>
                ) : predictions.length > 0 ? (
                  predictions.map((prediction, index) => (
                    <div
                      key={prediction.placeId || index}
                      onClick={() => handleSelectPrediction(prediction)}
                      className="px-[34px] py-3 cursor-pointer hover:bg-[#F3F4F6] transition-colors border-b border-[#DEE1E6] last:border-b-0"
                    >
                      <div className="text-[16px] font-medium text-[#171A1F]">
                        {prediction.description}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[#A1A1A1]">No results found</div>
                )}
              </div>
            )}
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Apt, Suite, Unit (optional)</label>
            <input
              type="text"
              placeholder="Apt, Sui ..."
              value={address.apt}
              onChange={(e) => update('apt', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={address.city}
              onChange={(e) => update('city', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Select a State</label>
            <input
              type="text"
              placeholder="Select a State"
              value={address.state}
              onChange={(e) => update('state', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          <div className="relative w-full h-[100px] bg-white border-2 border-[#DEE1E6] rounded-[16px] px-[34px] flex flex-col justify-center shadow-[0px_1px_2.5px_rgba(23,26,31,0.07)]">
            <label className="text-[16px] font-bold text-[#171A1F] leading-[24px]">Zip Code</label>
            <input
              type="text"
              placeholder="Enter Zip Code"
              value={address.zip}
              onChange={(e) => update('zip', e.target.value)}
              className="text-[16px] font-medium text-[rgba(141,141,141,0.72)] bg-transparent outline-none"
            />
          </div>
          {/* <WhyAskedDisclosure
            question="What about other home types?"
            variant="muted"
            className="opacity-70"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AddressFormStep;
