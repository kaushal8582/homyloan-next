"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPressById } from "../services/pressApi";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function PressPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPressById(id);
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to load press release");
        console.error("Error fetching press:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPress();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading press release...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {error || "Press release not found"}
            </h2>
            <Link href="/press" className="text-blue-600 mt-4 inline-block hover:underline">
              ← Back to press releases
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto py-16 px-6 mt-[100px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          <p className="text-sm text-gray-600">{post.date}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="prose max-w-none text-gray-800 whitespace-pre-line">
          {post.content}
        </div>
        <div className="mt-8">
          <Link href="/press" className="text-blue-600 hover:underline">
            ← Back to press releases
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
