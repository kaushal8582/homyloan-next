"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "../services/jobApi";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function JobPost() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        setError(err.message || "Failed to load job");
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {error || "Job not found"}
            </h2>
            <Link
              href="/open-positions"
              className="text-blue-600 mt-4 inline-block hover:underline"
            >
              ← Back to open positions
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-16 px-6 mt-[100px]">
        {/* Image */}
        {job.image ? (
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
          />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-white text-6xl">💼</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium">
              {job.type}
            </span>
            <span className="text-gray-600">📍 {job.location}</span>
            {job.department && (
              <span className="text-gray-600">🏢 {job.department}</span>
            )}
            <span className="text-sm text-gray-500">{job.date}</span>
          </div>

          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
            {job.description}
          </div>
        </div>

        {/* Application Button */}
        {job.applicationLink && job.status === "open" && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <Link
              href={`/jobs/${id}/apply`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Apply Now
            </Link>
          </div>
        )}
        {job.status === "closed" && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="px-8 py-3 bg-gray-400 text-white rounded-lg font-medium text-lg text-center">
              This position is currently closed
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/open-positions" className="text-blue-600 hover:underline">
            ← Back to open positions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
