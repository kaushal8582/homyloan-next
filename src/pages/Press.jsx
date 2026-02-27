import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getAllPress } from "../services/pressApi";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const PRESS_PER_PAGE = 10;

export default function Press() {
  const [pressItems, setPressItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch press items from API
  useEffect(() => {
    const fetchPress = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllPress();
        setPressItems(data);
      } catch (err) {
        setError(err.message || "Failed to load press releases");
        console.error("Error fetching press:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPress();
  }, []);

  const tags = useMemo(() => {
    const set = new Set();
    pressItems.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [pressItems]);

  const filtered = pressItems.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    const matchesTag = !tagFilter || p.tags?.includes(tagFilter);
    return matchesQuery && matchesTag;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, tagFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / PRESS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRESS_PER_PAGE;
  const endIndex = startIndex + PRESS_PER_PAGE;
  const paginatedPress = filtered.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-6 mt-[100px]">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold uppercase">Press</h1>
            <p className="text-gray-600 mt-2">Latest news and press releases from HomyLoan.</p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search press releases..."
              className="px-4 py-2 border rounded-lg w-64"
            />

            <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">All Topics</option>
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </header>

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
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Press List */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No press releases found.</p>
                {(query || tagFilter) && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setTagFilter("");
                    }}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} press release{filtered.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {paginatedPress.map((item) => (
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
                        {/* The Wave */}
                        <img
                          src="/Vector.svg"
                          alt="Wave Background"
                          className="absolute bottom-0 inset-0 w-full h-full object-fill pointer-events-none scale-120 origin-bottom-right translate-x-4 sm:translate-x-6 md:translate-x-8 translate-y-6 sm:translate-y-7 md:translate-y-8 lg:translate-y-10"
                        />

                        {/* The Button */}
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
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-2 border rounded-lg transition-colors ${
                                  currentPage === page
                                    ? 'bg-black text-white border-black'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>

                    {/* Page Info */}
                    <p className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
