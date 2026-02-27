"use client";
import { useState, useRef, useEffect } from "react";

// Videos served from public/videos (no ES module imports for .mp4)
const videos = [
  "/videos/Homy Loan.mp4",
  "/videos/Homy Loan (2).mp4",
  "/videos/Homy Loan (3).mp4",
  "/videos/Homy Loan (4).mp4",
  "/videos/Homy Loan (5).mp4",
  "/videos/Homy Loan (6).mp4",
];

export const useHeroVideo = () => {
  // Use fixed initial value so server and client match (avoids hydration error)
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Pick random video only on client after mount
    setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [selectedVideo]);

  return { videoRef, selectedVideo };
};
