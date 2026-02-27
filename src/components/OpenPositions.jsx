import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getAllJobs } from '../services/jobApi';
import { useHeroVideo } from '../hooks/useHeroVideo';

const JOBS_PER_PAGE = 10;

const OpenPositions = () => {
  const { videoRef, selectedVideo } = useHeroVideo();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Failed to load jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const tags = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => j.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [jobs]);

  const types = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => j.type && set.add(j.type));
    return Array.from(set);
  }, [jobs]);

  const filtered = jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    const matchesTag = !tagFilter || j.tags?.includes(tagFilter);
    const matchesType = !typeFilter || j.type === typeFilter;
    return matchesQuery && matchesTag && matchesType;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, tagFilter, typeFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const paginatedJobs = filtered.slice(startIndex, endIndex);

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

  const excerpt = (text, max = 150) => {
    if (!text) return "";
    return text.length <= max ? text : text.slice(0, max).trim() + "…";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight uppercase">
            Open Positions
          </h1>

          {/* SUBTEXT */}
          <p className="mt-5 sm:mt-6 lg:mt-8 max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
            Join the HomyLoans team and help us transform the homebuying experience. 
            We're always looking for talented individuals who share our passion for 
            making homeownership accessible to everyone.
          </p>
        </div>
      </section>

      {/* Jobs Listing */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Available Positions</h2>
            <p className="text-gray-600 mt-2">Find your next opportunity with HomyLoans.</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs..."
              className="px-4 py-2 border rounded-lg w-64"
            />

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">All Departments</option>
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
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">Error loading jobs</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No job positions found.</p>
                {(query || tagFilter || typeFilter) && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setTagFilter("");
                      setTypeFilter("");
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} position{filtered.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedJobs.map((j) => (
                    <Link
                      href={`/jobs/${j.id}`}
                      key={j.id}
                      className="group block overflow-hidden rounded-2xl shadow-lg bg-white transition-transform hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="relative h-48 md:h-56 w-full overflow-hidden">
                        {j.image ? (
                          <img
                            src={j.image}
                            alt={j.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-4xl">💼</span>
                          </div>
                        )}
                        <div className="absolute left-4 bottom-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">{j.date}</div>
                        <div className="absolute right-4 top-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                          {j.type}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-2 flex-wrap">
                            {j.tags?.map((t) => (
                              <span key={t} className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">{t}</span>
                            ))}
                          </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-2 leading-tight text-gray-900">
                          {j.title}
                        </h2>

                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <span>📍 {j.location}</span>
                          {j.department && <span>🏢 {j.department}</span>}
                        </div>

                        <p className="text-gray-700 line-clamp-3 mb-4">{excerpt(j.description)}</p>

                        <div className="text-blue-600 font-medium">
                          View Details →
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
    </div>
  );
};

export default OpenPositions;
