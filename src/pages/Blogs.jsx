"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getAllBlogs } from "../services/blogApi";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const BLOGS_PER_PAGE = 10;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message || "Failed to load blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const tags = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [blogs]);

  const filtered = blogs.filter((b) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || (b.author && b.author.toLowerCase().includes(q));
    const matchesTag = !tagFilter || b.tags?.includes(tagFilter);
    return matchesQuery && matchesTag;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, tagFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filtered.slice(startIndex, endIndex);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 mt-20 sm:mt-24 md:mt-[100px]">
        <header className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Latest from HomyLoan</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">News, guides and insights to help you navigate home financing.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors..."
              className="px-4 py-2 border rounded-lg w-full sm:w-56 md:w-64 text-sm sm:text-base"
            />

            <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm sm:text-base w-full sm:w-auto">
              <option value="">All Topics</option>
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8 sm:py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading blogs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-red-800 font-medium text-sm sm:text-base">Error loading blogs</p>
            <p className="text-red-600 text-xs sm:text-sm mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-600 text-base sm:text-lg">No blogs found.</p>
                {(query || tagFilter) && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setTagFilter("");
                    }}
                    className="mt-4 text-sm sm:text-base text-blue-600 hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 text-xs sm:text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} blog{filtered.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {paginatedBlogs.map((b) => (
            <Link
              href={`/blogs/${b.id}`}
              key={b.id}
              className=" cursor-pointer group block overflow-hidden rounded-2xl shadow-lg bg-white transition-transform hover:-translate-y-1"
              aria-label={`Read article ${b.title}`}
            >
              <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm">{b.date}</div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  {/* <div className="text-sm text-gray-500">By {b.author}</div> */}
                  <div className="flex gap-2 flex-wrap">
                    {b.tags?.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">{t}</span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 leading-tight text-gray-900">
                  {b.title}
                </h2>

                <p className="text-gray-700 line-clamp-3 text-sm sm:text-base">{b.excerpt}</p>
              </div>
            </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-12 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                      {/* Previous Button */}
                      <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 flex-wrap justify-center">
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
                                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border rounded-lg transition-colors ${
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
                              <span key={page} className="px-1 sm:px-2 text-gray-500 text-sm">
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
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>

                    {/* Page Info */}
                    <p className="text-xs sm:text-sm text-gray-600">
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
