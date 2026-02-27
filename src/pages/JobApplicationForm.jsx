"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById } from "../services/jobApi";
import { uploadResume, submitApplication } from "../services/jobApplicationApi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function JobApplicationForm() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    resumeFile: null,
    resumeUrl: "",
    coverLetter: "",
    skillsExperience: "",
  });

  const [uploadProgress, setUploadProgress] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
    setError(null);
    setUploadProgress(true);

    try {
      const url = await uploadResume(file);
      setFormData((prev) => ({ ...prev, resumeUrl: url }));
      setUploadProgress(false);
    } catch (err) {
      setError(err.message || "Failed to upload resume");
      setUploadProgress(false);
      setFormData((prev) => ({ ...prev, resumeFile: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    setSubmitting(true);

    try {
      await submitApplication({
        jobId: id,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        resumeUrl: formData.resumeUrl,
        coverLetter: formData.coverLetter,
        skillsExperience: formData.skillsExperience,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/jobs/${id}`);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading application form...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{error}</h2>
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-green-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-2">
                Application Submitted!
              </h2>
              <p className="mb-4">
                Thank you for applying to <strong>{job?.title}</strong>. We'll
                review your application and get back to you soon.
              </p>
              <p className="text-sm">Redirecting to job details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto py-16 px-6 mt-[100px]">
        {/* Job Info Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-semibold mb-2">Apply for Position</h1>
          <h2 className="text-xl text-gray-700 mb-4">{job?.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>📍 {job?.location}</span>
            <span>💼 {job?.type}</span>
            {job?.department && <span>🏢 {job?.department}</span>}
          </div>
        </div>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 md:p-8 shadow-sm"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Resume
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploadProgress}
                />
                <label
                  htmlFor="resume"
                  className={`flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    uploadProgress
                      ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                      : formData.resumeUrl
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400"
                  }`}
                >
                  {uploadProgress ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-gray-600 font-medium">
                        Uploading...
                      </span>
                    </>
                  ) : formData.resumeUrl ? (
                    <>
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-green-700 font-medium">
                        {formData.resumeFile?.name ||
                          "Resume uploaded successfully"}
                      </span>
                      <span className="text-green-600 text-sm">
                        (Click to change)
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        Choose file
                      </span>
                    </>
                  )}
                </label>
              </div>
              {formData.resumeFile &&
                !formData.resumeUrl &&
                !uploadProgress && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected:{" "}
                    <span className="font-medium">
                      {formData.resumeFile.name}
                    </span>
                  </p>
                )}
              <p className="mt-2 text-xs text-gray-500">
                Accepted formats: PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>

            {/* Cover Letter */}
            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us why you're interested in this position..."
              />
            </div>

            {/* Skills/Experience */}
            <div>
              <label
                htmlFor="skillsExperience"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Skills / Experience (Optional)
              </label>
              <textarea
                id="skillsExperience"
                name="skillsExperience"
                rows={4}
                value={formData.skillsExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List your relevant skills and experience..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <Link
              href={`/jobs/${id}`}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Back Link */}
        <div className="mt-6">
          <Link href={`/jobs/${id}`} className="text-blue-600 hover:underline">
            ← Back to job details
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
