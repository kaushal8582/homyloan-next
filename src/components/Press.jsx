"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPress } from "../services/pressApi";

const Press = () => {
  const [pressData, setPressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllPress();
        // Limit to first 3 items for component display
        setPressData(data.slice(0, 3));
      } catch (err) {
        setError(err.message || "Failed to load press releases");
        console.error("Error fetching press:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPress();
  }, []);

  return (
    <section className="w-full min-h-screen bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase mb-10 sm:mb-12 lg:mb-14">
          Press
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Loading press releases...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">Error loading press releases</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Press List */}
        {!loading && !error && (
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {pressData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No press releases available.</p>
              </div>
            ) : (
              pressData.map((item) => (
                <Link
                  href={`/press/${item.id}`}
                  key={item.id}
                  className="relative flex items-center bg-[#FFFFFF] rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Left Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 p-1.5 sm:p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 px-3 sm:px-4 md:px-5 py-3 sm:py-4">
                    <h4 className="text-xs sm:text-sm md:text-base font-semibold text-black leading-tight">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-black/60 leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Right Action */}
                  <div className="absolute right-0 bottom-0 w-24 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-24 flex items-center justify-center overflow-hidden">
                    {/* The Wave - Scaled up to look bigger, then pushed down and right */}
                    <img
                      src="/Vector.svg"
                      alt="Wave Background"
                      className="absolute bottom-0 inset-0 w-full h-full object-fill pointer-events-none scale-120 origin-bottom-right translate-x-4 sm:translate-x-6 md:translate-x-8 translate-y-6 sm:translate-y-7 md:translate-y-8 lg:translate-y-10"
                    />

                    {/* The Button - Pushed right and down to sit on the larger wave */}
                    <div className="relative z-10 translate-x-8 sm:translate-x-10 md:translate-x-12 lg:translate-x-16 translate-y-4 sm:translate-y-5 md:translate-y-6">
                      <div className="group bg-[#E6FF4B] border-[1.5px] sm:border-[2px] border-black rounded-full p-1.5 sm:p-2 shadow-md active:scale-90 transition-all cursor-pointer hover:shadow-lg">
                        <img
                          src="/arrow-up-right.svg"
                          alt="Read More"
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Press;
